require 'tempfile'
require_relative 'support/knox_http_server'

describe Fastlane::Actions::KnoxConfigureLibraryUploadAppAction do
  around do |example|
    keys = described_class.available_options.filter_map(&:env_name)
    original = keys.to_h { |key| [key, ENV.fetch(key, nil)] }
    keys.each { |key| ENV.delete(key) }
    Tempfile.create(['application', '.apk']) do |file|
      file.binmode
      file.write("PK\x00\xFF".b)
      file.flush
      @apk_path = file.path
      example.run
    end
  ensure
    original.each { |key, value| value.nil? ? ENV.delete(key) : ENV[key] = value }
  end

  it 'exchanges one OAuth token and uploads through the default action without exposing secrets' do
    # Given
    params = FastlaneCore::Configuration.create(described_class.available_options, app_file_path: @apk_path, client_id: 'id', client_secret: 'secret +&')
    response = { 'applicationId' => 'app-123', 'status' => 'InProgress' }
    logs = []
    [:header, :message, :success].each { |method| allow(Fastlane::UI).to receive(method) { |message| logs << message } }
    expect(JWT).not_to receive(:encode)
    with_http_responses([[200, '{"access_token":"opaque-token","token_type":"Bearer"}'], [200, response.to_json]]) do |requests|
      # When
      result = described_class.run(params)
      # Then
      expect(result).to eq(response)
      expect(requests.length).to eq(2)
      expect(URI.decode_www_form(requests.first[:body]).to_h['scope']).to eq('kc.application:manage')
      expect(requests.last[:headers]['authorization']).to eq('Bearer opaque-token')
      expect(logs.join).not_to include('opaque-token', 'secret +&')
    end
  end

  it 'does not fall back or upload when OAuth authentication fails' do
    # Given
    params = FastlaneCore::Configuration.create(described_class.available_options, app_file_path: @apk_path, client_id: 'id', client_secret: 'secret')
    expect(Fastlane::KnoxTokenGenerator).not_to receive(:generate_knox_access_token)
    with_http_responses([[401, '{"message":"unauthorized"}']]) do |requests|
      # When / Then
      expect { described_class.run(params) }.to raise_error(Fastlane::KnoxHttpResponse::RequestError)
      expect(requests.length).to eq(1)
    end
  end

  it 'uses the signed regional v1 flow only when legacy is explicitly selected' do
    # Given
    rsa = OpenSSL::PKey::RSA.new(2048)
    credential = {
      Identifier: 'identifier',
      Private: Base64.strict_encode64(rsa.private_to_der),
      Public: Base64.strict_encode64(rsa.public_to_der)
    }
    allow(Time).to receive(:now).and_return(Time.at(1_700_000_000))
    allow(SecureRandom).to receive(:uuid).and_return('fixed-uuid')
    params = FastlaneCore::Configuration.create(described_class.available_options,
                                                auth_mode: 'legacy', app_file_path: @apk_path, api_region: 'EU',
                                                credential_key: credential.to_json, clientIdentifierJwtToken: 'client-identifier')
    uploaded = '{"successResponse":[{"appInfo":[{"name":"application","packageVersion":"1"}]}]}'
    with_http_responses([[200, '{"accessToken":"ams-token"}'], [200, uploaded]]) do |requests, destinations|
      # When
      described_class.run(params)
      # Then
      expect(destinations.map(&:first)).to eq(['eu-kcs-api.samsungknox.com', 'eu-kcs-api.samsungknox.com'])
      expect(requests.first[:line]).to eq("POST /ams/v1/users/accesstoken HTTP/1.1\r\n")
      exchange = JSON.parse(requests.first[:body])
      expect(exchange['validityForAccessTokenInMinutes']).to eq(30)
      signed_identifier = JWT.decode(exchange['clientIdentifierJwt'], rsa.public_key, true, algorithm: 'RS512', verify_expiration: false).first
      expect(signed_identifier).to include('clientIdentifier' => 'client-identifier', 'aud' => 'KnoxWSM', 'algorithm' => 'RS512', 'iat' => 1_700_000_000, 'exp' => 1_700_001_800, 'jti' => 'fixed-uuidfixed-uuid')
      expect(requests.last[:line]).to eq("POST /kcs/v1/kc/applications/upload HTTP/1.1\r\n")
      expect(requests.last[:headers]).not_to have_key('authorization')
      signed_access = JWT.decode(requests.last[:headers]['x-knox-apitoken'], rsa.public_key, true, algorithm: 'RS512', verify_expiration: false).first
      expect(signed_access['accessToken']).to eq('ams-token')
      expect(requests.last[:body]).to include("PK\x00\xFF".b)
    end
  end
end
