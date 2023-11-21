require 'fastlane/action'
require_relative '../helper/knox_token_generator'

module Fastlane
  module Actions
    class KnoxConfigureLibraryUploadAppAction < Action
      def self.run(params)
        UI.message("Welcome to Knox Configure Library Application Upload Fastlane!")

        credential = { path: params[:credential_path], key: params[:credential_key] }
        clientIdentifierJwtToken = params[:clientIdentifierJwtToken]

      signed_jwt = KnoxTokenGenerator.generate_knox_access_token(credential, clientIdentifierJwtToken)

      end

      def self.description
        "fastlane plugin for Samsung Knox Configure Library"
      end

      def self.authors
        ["jieey1140"]
      end

      def self.return_value
        # If your method provides a return value, you can describe here what it does
      end

      def self.details
        "upload applications built using the Samsung Knox Configure Library in fastlane."
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :kc_app_name,
                                       env_name: "KC_APP_NAME",
                                       description: "",
                                       optional: false),
          FastlaneCore::ConfigItem.new(key: :description,
                                       env_name: "KC_APP_DESCRIPTION",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :app_file_path,
                                       env_name: "KC_APP_FILE_PATH",
                                       description: "Path to your APK file",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :credential_key,
                                       env_name: "KNOX_CREDENTIAL",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :credential_path,
                                       env_name: "KNOX_CREDENTIAL",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :clientIdentifierJwtToken,
                                       env_name: "KNOX_CLIENT_IEDNTIFIER_JWT_TOKEN",
                                       description: "",
                                       optional: false),
        ]
      end

      def self.is_supported?(platform)
        [:android].include?(platform)
      end
    end
  end
end
