require_relative 'support/knox_http_server'

describe Fastlane::KnoxTokenGenerator do
  it 'sends encoded client credentials and multiple scopes as a form without RSA signing' do
    # Given
    credentials = { client_id: 'id +&', client_secret: 'secret =+', scope: 'kc.application:manage kc.application:view' }
    expect(JWT).not_to receive(:encode)
    expect(Fastlane::UI).not_to receive(:message)
    with_http_responses([[200, '{"access_token":"opaque-token","token_type":"Bearer","expires_in":3600,"scope":"kc.application:manage"}']]) do |requests, destinations|
      # When
      result = described_class.generate_oauth_access_token(**credentials)
      # Then
      expect(result).to eq('opaque-token')
      expect(destinations.first).to eq(['api.samsungknox.com', 443, { use_ssl: true, open_timeout: 30, read_timeout: 30 }])
      expect(requests.first[:line]).to eq("POST /ams/v1/oauth2/token HTTP/1.1\r\n")
      expect(requests.first[:headers]['content-type']).to eq('application/x-www-form-urlencoded')
      expect(URI.decode_www_form(requests.first[:body]).to_h).to eq(credentials.transform_keys(&:to_s).merge('grant_type' => 'client_credentials'))
    end
  end

  [
    [401, '{"message":"secret =+ opaque-token"}', Fastlane::KnoxHttpResponse::RequestError],
    [503, '<html>secret =+</html>', Fastlane::KnoxHttpResponse::RequestError],
    [200, 'not JSON', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '<html>secret =+ opaque-token</html>', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '[]', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"access_token":"","token_type":"Bearer"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"access_token":42,"token_type":"Bearer"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"access_token":"token","token_type":"Basic"}', Fastlane::KnoxHttpResponse::InvalidResponse],
    [200, '{"access_token":"token\\r\\nheader","token_type":"Bearer"}', Fastlane::KnoxHttpResponse::InvalidResponse]
  ].each_with_index do |(status, body, error), index|
    it "rejects unsuccessful or invalid token response #{index} without leaking secrets" do
      # Given
      with_http_responses([[status, body]]) do
        # When / Then
        expect { described_class.generate_oauth_access_token(client_id: 'id', client_secret: 'secret =+') }.to raise_error(error) do |failure|
          expect(failure.full_message).not_to include('secret =+', 'opaque-token')
          expect(failure.cause).to be_nil
          expect(failure.status).to eq(status.to_s) if failure.kind_of?(Fastlane::KnoxHttpResponse::RequestError)
        end
      end
    end
  end
end
