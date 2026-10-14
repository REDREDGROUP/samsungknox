require 'tempfile'
require_relative 'support/knox_http_server'

describe 'Legacy helpers' do
  it 'keeps the legacy duplicate response as a skip' do
    # Given
    Tempfile.create(['application', '.apk']) do |file|
      with_http_responses([[400, '{"data":" APP_BINARY_EXISTS "}']]) do
        # When / Then
        expect { Fastlane::KnoxConfigureLibraryUploadApp.upload_app('legacy-token', file.path, nil, 'eu') }.not_to raise_error
      end
    end
  end

  ['{}', '{"data":null}', '{"data":42}', '<html>legacy-token</html>', '[]'].each do |body|
    it "raises a safe HTTP error when the legacy error has body #{body}" do
      # Given
      Tempfile.create(['application', '.apk']) do |file|
        with_http_responses([[500, body]]) do
          # When / Then
          expect { Fastlane::KnoxConfigureLibraryUploadApp.upload_app('legacy-token', file.path, nil, 'eu') }.to raise_error(Fastlane::KnoxHttpResponse::RequestError) do |error|
            expect(error.message).not_to include('legacy-token')
          end
        end
      end
    end
  end

  it 'returns application data with an encoded regional legacy query without logging the token' do
    # Given
    applications = { 'applications' => [{ 'packageName' => 'package &+' }], 'totalCount' => 1 }
    expect(Fastlane::UI).not_to receive(:message)
    with_http_responses([[200, applications.to_json]]) do |requests, destinations|
      # When
      result = Fastlane::KnoxConfigureLibraryAlreadyExistsAppVersionCheck.search_by_package_name('legacy-token', 'package &+', api_region: 'US')
      # Then
      expect(result).to eq(applications)
      expect(destinations.first.first).to eq('us-kcs-api.samsungknox.com')
      expect(requests.first[:line]).to eq("GET /kcs/v1/kc/applications?packageName=package+%26%2B HTTP/1.1\r\n")
      expect(requests.first[:headers]['x-knox-apitoken']).to eq('legacy-token')
      expect(requests.first[:headers]).not_to have_key('authorization')
    end
  end
end
