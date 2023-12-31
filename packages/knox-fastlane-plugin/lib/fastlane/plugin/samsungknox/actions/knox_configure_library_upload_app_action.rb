require 'fastlane/action'
require_relative '../helper/knox_token_generator'
# require_relative '../helper/knox_configure_library_already_exists_app_version_check'
require_relative '../helper/knox_configure_library_upload_app'

module Fastlane
  module Actions
    class KnoxConfigureLibraryUploadAppAction < Action
      def self.run(params)
        UI.header("Step: KC Upload App")

        access_token = KnoxTokenGenerator.generate_knox_access_token({
          path: params[:credential_path], 
          key: params[:credential_key] 
          },
          params[:clientIdentifierJwtToken],
          params[:api_region].downcase
        )

        # application_info = KnoxConfigureLibraryAlreadyExistsAppVersionCheck.search_by_package_name(
        #   access_token[:token], 
        #   params[:package_name]
        # )

        KnoxConfigureLibraryUploadApp.upload_app(
          access_token[:token], 
          params[:app_file_path],
          params[:app_description],
          params[:api_region].downcase
        )
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
          # FastlaneCore::ConfigItem.new(key: :app_name,
          #                              env_name: "KC_APP_NAME",
          #                              description: "",
          #                              optional: false),
          # FastlaneCore::ConfigItem.new(key: :package_name,
          #                              env_name: "KC_PACKAGE_NAME",
          #                              description: "",
          #                              optional: false),
          
          # App Configuretion
          FastlaneCore::ConfigItem.new(key: :app_description,
                                       env_name: "KC_APP_DESCRIPTION",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :app_file_path,
                                       env_name: "KC_APP_FILE_PATH",
                                       description: "Path to your APK file",
                                       optional: true),
          
          # Knox Credential Configuration
          FastlaneCore::ConfigItem.new(key: :api_region,
                                       env_name: "KC_API_REGION",
                                       description: "",
                                       optional: false,
                                       verify_block: proc do |value|
                                          UI.user_error!("No API region for Knox Credential given, pass using `api_region: 'value'`") unless (value and not value.empty?)
                                        end
                                      ),
          FastlaneCore::ConfigItem.new(key: :credential_key,
                                       env_name: "KNOX_CREDENTIAL_KEY",
                                       description: "",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :credential_path,
                                       env_name: "KNOX_CREDENTIAL_PATH",
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
