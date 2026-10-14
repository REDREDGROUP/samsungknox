require 'fastlane/action'
require 'fastlane_core/configuration/config_item'
require_relative '../helper/knox_token_generator'
require_relative '../helper/knox_configure_library_upload_app'

module Fastlane
  module Actions
    class KnoxConfigureLibraryUploadAppAction < Action
      def self.run(params)
        UI.header("Step: KC Upload App")
        validate_options(params)
        case params[:auth_mode] || 'oauth'
        when 'oauth'
          token = KnoxTokenGenerator.generate_oauth_access_token(
            client_id: params[:client_id], client_secret: params[:client_secret],
            scope: params[:scope] || 'kc.application:manage'
          )
          KnoxConfigureLibraryUploadApp.upload_oauth_app(token, params[:app_file_path], params[:app_description])
        when 'legacy'
          access_token = KnoxTokenGenerator.generate_knox_access_token(
            { path: params[:credential_path], key: params[:credential_key] },
            params[:clientIdentifierJwtToken], params[:api_region].downcase
          )
          KnoxConfigureLibraryUploadApp.upload_app(
            access_token[:token], params[:app_file_path], params[:app_description], params[:api_region].downcase
          )
        end
      end

      def self.validate_options(params)
        path = params[:app_file_path]
        UI.user_error!("app_file_path must be a readable APK file") unless path && File.file?(path) && File.readable?(path) && File.extname(path).casecmp?('.apk')
        legacy_keys = [:credential_path, :credential_key, :clientIdentifierJwtToken, :api_region]
        oauth_keys = [:client_id, :client_secret, :scope]
        case params[:auth_mode] || 'oauth'
        when 'oauth'
          UI.user_error!("OAuth cannot be mixed with legacy credentials or region") if legacy_keys.any? { |key| params[key] }
          required = [:client_id, :client_secret]
        when 'legacy'
          UI.user_error!("Legacy cannot be mixed with OAuth credentials or scope") if oauth_keys.any? { |key| params[key] }
          sources = [:credential_path, :credential_key].count { |key| params[key] && !params[key].strip.empty? }
          UI.user_error!("Legacy requires exactly one credential source") unless sources == 1
          required = [:api_region, :clientIdentifierJwtToken]
        else
          UI.user_error!("auth_mode must be oauth or legacy")
        end
        required.each do |key|
          UI.user_error!("#{key} is required for this auth_mode") unless params[key] && !params[key].strip.empty?
        end
        UI.user_error!("scope must not be empty") if params[:scope] && params[:scope].strip.empty?
      end

      def self.description
        "fastlane plugin for Samsung Knox Configure Library"
      end

      def self.authors
        ["jieey1140"]
      end

      def self.return_value
      end

      def self.details
        "upload applications built using the Samsung Knox Configure Library in fastlane."
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :auth_mode,
                                       env_name: "KNOX_AUTH_MODE",
                                       description: "OAuth (default) or explicit legacy authentication",
                                       default_value: 'oauth',
                                       verify_block: proc do |value|
                                         UI.user_error!("auth_mode must be oauth or legacy") unless ['oauth', 'legacy'].include?(value)
                                       end),
          FastlaneCore::ConfigItem.new(key: :client_id,
                                       env_name: "KNOX_CLIENT_ID",
                                       description: "OAuth client ID",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :client_secret,
                                       env_name: "KNOX_CLIENT_SECRET",
                                       description: "OAuth client secret",
                                       sensitive: true,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :scope,
                                       env_name: "KNOX_SCOPE",
                                       description: "OAuth scopes (default kc.application:manage)",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :app_description,
                                       env_name: "KC_APP_DESCRIPTION",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :app_file_path,
                                       env_name: "KC_APP_FILE_PATH",
                                       description: "Path to your APK file",
                                       optional: false,
                                       verify_block: proc do |value|
                                         UI.user_error!("app_file_path must be a readable APK file") unless File.file?(value) && File.readable?(value) && File.extname(value).casecmp?('.apk')
                                       end),

          # Knox Credential Configuration
          FastlaneCore::ConfigItem.new(key: :api_region,
                                       env_name: "KC_API_REGION",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :credential_key,
                                       env_name: "KNOX_CREDENTIAL_KEY",
                                       description: "",
                                       sensitive: true,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :credential_path,
                                       env_name: "KNOX_CREDENTIAL_PATH",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :clientIdentifierJwtToken,
                                       env_name: "KNOX_CLIENT_IEDNTIFIER_JWT_TOKEN",
                                       description: "",
                                       sensitive: true,
                                       optional: true)
        ]
      end

      def self.is_supported?(platform)
        [:android].include?(platform)
      end
    end
  end
end
