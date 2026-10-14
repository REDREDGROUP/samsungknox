require 'tempfile'

describe Fastlane::Actions::KnoxConfigureLibraryUploadAppAction do
  around do |example|
    # Given: isolate option environment sources from the operator's shell.
    keys = described_class.available_options.filter_map(&:env_name)
    original = keys.to_h { |key| [key, ENV.fetch(key, nil)] }
    keys.each { |key| ENV.delete(key) }
    Tempfile.create(['application', '.apk']) do |file|
      @apk_path = file.path
      example.run
    end
  ensure
    original.each { |key, value| value.nil? ? ENV.delete(key) : ENV[key] = value }
  end

  def configuration(values)
    FastlaneCore::Configuration.create(described_class.available_options, values)
  end

  it 'uses OAuth when no authentication mode is supplied' do
    # Given
    Tempfile.create(['application', '.apk']) do |file|
      values = { app_file_path: file.path, client_id: 'client', client_secret: 'secret' }
      # When
      config = configuration(values)
      # Then
      expect(config[:auth_mode]).to eq('oauth')
    end
  end

  it 'rejects a missing APK when configuration is read' do
    # Given
    config = configuration(client_id: 'client', client_secret: 'secret')
    # When / Then
    expect { config[:app_file_path] }.to raise_error(FastlaneCore::Interface::FastlaneError)
  end

  ['missing.apk', __FILE__, File.dirname(__FILE__)].each do |path|
    it "rejects invalid APK input #{path}" do
      # Given / When / Then
      expect { configuration(app_file_path: path) }.to raise_error(FastlaneCore::Interface::FastlaneError)
    end
  end

  it 'rejects an unreadable APK before authentication' do
    # Given
    allow(File).to receive(:readable?).with(@apk_path).and_return(false)
    # When / Then
    expect { configuration(app_file_path: @apk_path) }.to raise_error(FastlaneCore::Interface::FastlaneError)
  end

  it 'rejects an unknown authentication mode' do
    # Given / When / Then
    expect { configuration(auth_mode: 'automatic', app_file_path: @apk_path) }.to raise_error(FastlaneCore::Interface::FastlaneError)
  end

  [
    { client_id: 'client' },
    { client_secret: 'secret' },
    { client_id: ' ', client_secret: 'secret' },
    { client_id: 'client', client_secret: 'secret', scope: ' ' },
    { client_id: 'client', client_secret: 'secret', credential_key: '{}' },
    { client_id: 'client', client_secret: 'secret', credential_path: 'legacy.json' },
    { client_id: 'client', client_secret: 'secret', clientIdentifierJwtToken: 'legacy' },
    { client_id: 'client', client_secret: 'secret', api_region: 'EU' },
    { auth_mode: 'legacy', credential_key: '{}', api_region: 'EU' },
    { auth_mode: 'legacy', credential_key: '{}', clientIdentifierJwtToken: 'legacy' },
    { auth_mode: 'legacy', api_region: 'EU', clientIdentifierJwtToken: 'legacy' },
    { auth_mode: 'legacy', credential_key: '{}', credential_path: 'legacy.json', api_region: 'EU', clientIdentifierJwtToken: 'legacy' },
    { auth_mode: 'legacy', credential_key: '{}', api_region: 'EU', clientIdentifierJwtToken: 'legacy', client_id: 'client' },
    { auth_mode: 'legacy', credential_key: '{}', api_region: 'EU', clientIdentifierJwtToken: 'legacy', client_secret: 'secret' },
    { auth_mode: 'legacy', credential_key: '{}', api_region: 'EU', clientIdentifierJwtToken: 'legacy', scope: 'kc' }
  ].each_with_index do |values, index|
    it "rejects invalid conditional credentials #{index} before network access" do
      # Given
      config = configuration(values.merge(app_file_path: @apk_path))
      expect(Net::HTTP).not_to receive(:start)
      # When / Then
      expect { described_class.run(config) }.to raise_error(FastlaneCore::Interface::FastlaneError)
    end
  end

  it 'accepts the existing misspelled legacy token environment variable' do
    # Given
    ENV['KNOX_CLIENT_IEDNTIFIER_JWT_TOKEN'] = 'legacy'
    config = configuration(auth_mode: 'legacy', app_file_path: @apk_path, credential_key: '{}', api_region: 'EU')
    # When
    described_class.validate_options(config)
    # Then
    expect(config[:clientIdentifierJwtToken]).to eq('legacy')
  end

  it 'accepts a legacy credential file without an inline credential' do
    # Given
    config = configuration(auth_mode: 'legacy', app_file_path: @apk_path, credential_path: 'legacy.json', api_region: 'EU', clientIdentifierJwtToken: 'legacy')
    # When / Then
    expect { described_class.validate_options(config) }.not_to raise_error
  end
end
