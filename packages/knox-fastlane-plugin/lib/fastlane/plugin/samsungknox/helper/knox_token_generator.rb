require 'fastlane_core/ui/ui'
require 'jwt'
require 'openssl'
require 'base64'
require 'securerandom'
require_relative 'knox_configure_error_message'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxTokenGenerator
    def self.read_credential(credential)
      UI.crash!(ErrorMessage::BOTH_CREDENTIAL_DETECTED) if credential[:path] && credential[:key]
      UI.crash!(ErrorMessage::CREDENTIAL_MISSING) unless credential[:path] || credential[:key]

      begin
        credential_manifest = if credential[:path]
                                begin
                                  JSON.parse(File.read(credential[:path]))
                                rescue Errno::ENOENT, Errno::EACCES => e
                                  raise ErrorMessage::CREDENTIAL_FILE_NOT_FOUND, e.message
                                end
                              elsif credential[:key]
                                JSON.parse(credential[:key])
                              end

        raise TypeError, ErrorMessage::IDENTIFIER_MISSING if credential_manifest['Identifier'].nil? || credential_manifest['Identifier'].empty?
        raise TypeError, ErrorMessage::PRIVATE_MISSING if credential_manifest['Private'].nil? || credential_manifest['Private'].empty?
        raise TypeError, ErrorMessage::PUBLIC_MISSING if credential_manifest['Public'].nil? || credential_manifest['Public'].empty?

        credential_manifest
      rescue JSON::ParserError
        raise ErrorMessage::CREDENTIAL_IS_NOT_JSON_TYPE
      end
    end

    def self.generate_jwt_id
      SecureRandom.uuid + SecureRandom.uuid
    end

    def self.export_credential_private_key(private_key_str)
      pem_header = "-----BEGIN PRIVATE KEY-----\n"
      pem_footer = "\n-----END PRIVATE KEY-----"
      full_key = pem_header + private_key_str + pem_footer
      OpenSSL::PKey::RSA.new(full_key)
    end

    def self.export_credential_public_der_key(public_key_str)
      pem_header = "-----BEGIN PUBLIC KEY-----\n"
      pem_footer = "\n-----END PUBLIC KEY-----"
      full_key = pem_header + public_key_str + pem_footer
      rsa_public_key = OpenSSL::PKey::RSA.new(full_key)
      der_public_key = rsa_public_key.to_der
      Base64.encode64(der_public_key)
    end

    def self.get_access_token(validity_for_access_token_in_minutes, base64_encoded_string_public_key, client_identifier_jwt, api_region)
      uri = URI("https://#{api_region}-kcs-api.samsungknox.com/ams/v1/users/accesstoken")

      request_body = {
        base64EncodedStringPublicKey: base64_encoded_string_public_key,
        clientIdentifierJwt: client_identifier_jwt
      }
      request_body[:validityForAccessTokenInMinutes] = validity_for_access_token_in_minutes unless validity_for_access_token_in_minutes.nil?

      response = Net::HTTP.post(uri, request_body.to_json, "Content-Type" => "application/json")

      if response.kind_of?(Net::HTTPSuccess)
        data = JSON.parse(response.body)
        UI.success('✅ ams accessToken generated successfully')
        return data["accessToken"]
      else
        raise "Request failed with response: #{response.body}"
      end
    end

    def self.generate_knox_access_token(credential, client_identifier_jwt_token, api_region)
      UI.header('Step: 🔐 KNOX ACCESS TOKEN GENERATE 🔐 ')

      UI.message('🔐 Sign in the knox token using the credential...')
      generate_signed_jwt_result = generate_signed_jwt(credential, client_identifier_jwt_token, true)

      base64_encoding_public_key = generate_signed_jwt_result[:public_key]
      sign_by_client_identifier_jwt_token = generate_signed_jwt_result[:token]

      UI.message('⏳ Request the knox client identifier jwt ams access token.')
      ams_access_token = get_access_token(30, base64_encoding_public_key, sign_by_client_identifier_jwt_token, api_region)
      UI.message('🔐 Sign the knox token using the ams access token and private key.')
      token = generate_signed_jwt(credential, ams_access_token, false)

      return { token: token[:token] }
    end

    def self.generate_signed_jwt(credential, token_or_access, is_client_identifier)
      cred_data = read_credential(credential)

      private_key_str = cred_data['Private']
      public_key_str = cred_data['Public']

      private_key = export_credential_private_key(private_key_str)
      public_key = export_credential_public_der_key(public_key_str).gsub("\n", '')

      payload = { publicKey: public_key }
      payload[:clientIdentifier] = token_or_access if is_client_identifier
      payload[:accessToken] = token_or_access unless is_client_identifier

      payload[:aud] = 'KnoxWSM'
      payload[:exp] = Time.now.to_i + (30 * 60)
      payload[:iat] = Time.now.to_i
      payload[:algorithm] = 'RS512'
      payload[:jti] = generate_jwt_id

      token = JWT.encode(payload, private_key, 'RS512')

      UI.success('✅ token generated successfully')
      return { public_key: public_key, token: token }
    end
  end
end
