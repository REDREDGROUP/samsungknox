require 'net/http/post/multipart'
require 'uri'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxConfigureLibraryUploadApp
    def self.upload_app(access_token, app_file_path, app_description, api_region)
      UI.header('Step: 📲 Upload Application to Knox Configure Library 📲 ')

      uri = URI("https://#{api_region}-kcs-api.samsungknox.com/kcs/v1/kc/applications/upload")

      File.open(app_file_path) do |file|
        request = Net::HTTP::Post::Multipart.new uri,
          "file" => UploadIO.new(file, "multipart/form-data", File.basename(app_file_path))
    
        request['X-KNOX-APITOKEN'] = access_token
    
        UI.message("⌛ Uploading the Application. Please wait a moment...")
        response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end

        if response.is_a?(Net::HTTPSuccess)
          uploadResponseBody = JSON.parse(response.body)
          successResponse = uploadResponseBody['successResponse'][0]
          appInfo = successResponse['appInfo'][0]
          UI.success("🎉 Uploaded Application [#{appInfo['name']}] v#{appInfo['packageVersion']} successfully!")
        else
          uploadResponseBody = JSON.parse(response.body)
          if uploadResponseBody['data'].strip == 'APP_BINARY_EXISTS'
            UI.success("✅ The same Application was found in release with no changes, skipping.")
          else
            raise "Request failed with response: #{response.body}"
          end
        end        
      end
    end
  end
end
