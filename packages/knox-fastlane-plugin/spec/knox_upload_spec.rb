require 'tempfile'
require_relative 'support/knox_http_server'

describe Fastlane::KnoxConfigureLibraryUploadApp do
  around do |example|
    Tempfile.create(['application', '.apk']) do |file|
      file.binmode
      @bytes = "PK\x00\xFF\x80\r\nactual-apk".b
      file.write(@bytes)
      file.flush
      @path = file.path
      example.run
    end
  end

  ['Deployable', 'InProgress'].each do |status|
    it "returns the actual #{status} state when the server accepts the binary" do
      # Given
      description = "internal & QA + \uD55C\uAD6D\uC5B4"
      response = { 'applicationId' => 'app-123', 'status' => status }
      expect(Fastlane::UI).not_to receive(:success) if status == 'InProgress'
      with_http_responses([[200, response.to_json]]) do |requests, destinations|
        # When
        result = described_class.upload_oauth_app('opaque-token', @path, description)
        # Then
        expect(result).to eq(response)
        expect(destinations.first[0..1]).to eq(['api.samsungknox.com', 443])
        expect(requests.first[:line]).to eq("POST /kc/v2/applications/inhouseApplications?#{URI.encode_www_form(description: description)} HTTP/1.1\r\n")
        headers = requests.first[:headers]
        expect(headers['authorization']).to eq('Bearer opaque-token')
        expect(headers).not_to have_key('x-knox-apitoken')
        boundary = headers.fetch('content-type').split('boundary=', 2).last
        expect(headers['content-type']).to start_with('multipart/form-data;')
        parts = requests.first[:body].split("--#{boundary}".b)
        file_headers, file_content = parts[1].split("\r\n\r\n".b, 2)
        expect(file_headers).to include('name="file"', "filename=\"#{File.basename(@path)}\"", 'application/vnd.android.package-archive')
        expect(file_content.delete_suffix("\r\n".b)).to eq(@bytes)
        expect(parts.length).to eq(3)
      end
    end
  end

  it 'omits the query when description is absent' do
    # Given
    with_http_responses([[200, '{"applicationId":"app-123","status":"Deployable"}']]) do |requests|
      # When
      described_class.upload_oauth_app('token', @path, nil)
      # Then
      expect(requests.first[:line]).to eq("POST /kc/v2/applications/inhouseApplications HTTP/1.1\r\n")
    end
  end

  it 'raises when processing failed despite HTTP success' do
    # Given
    with_http_responses([[200, '{"applicationId":"app-123","status":"Failed"}']]) do
      # When / Then
      expect { described_class.upload_oauth_app('token', @path, nil) }.to raise_error(described_class::UploadFailed) do |error|
        expect(error.application_id).to eq('app-123')
      end
    end
  end

  [
    [403, '{"code":40300000,"message":"token secret","errorId":"trace"}', Fastlane::KnoxHttpResponse::RequestError],
    [400, '{"data":"APP_BINARY_EXISTS"}', Fastlane::KnoxHttpResponse::RequestError],
    [500, '<html>token secret</html>', Fastlane::KnoxHttpResponse::RequestError],
    [200, 'not JSON', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '<html>token secret</html>', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, 'null', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"status":"Deployable"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"applicationId":123,"status":"Deployable"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"applicationId":"","status":"Deployable"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"applicationId":"app-123"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"applicationId":"app-123","status":"Unknown"}', Fastlane::KnoxHttpResponse::InvalidResponse]
  ].each_with_index do |(status, body, error), index|
    it "rejects unsuccessful or invalid upload response #{index}" do
      # Given
      with_http_responses([[status, body]]) do
        # When / Then
        expect { described_class.upload_oauth_app('token', @path, nil) }.to raise_error(error) do |failure|
          expect(failure.full_message).not_to include('token secret')
          expect(failure.cause).to be_nil
        end
      end
    end
  end
end
