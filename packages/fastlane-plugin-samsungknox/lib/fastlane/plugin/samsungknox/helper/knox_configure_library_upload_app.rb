require 'net/http/post/multipart'
require 'uri'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxConfigureLibraryUploadApp
    def self.upload_app(access_token, app_file_path)
      uri = URI('https://eu-kcs-api.samsungknox.com/kcs/v1/kc/applications/upload')

      File.open(app_file_path) do |file|
        request = Net::HTTP::Post::Multipart.new uri,
          "file" => UploadIO.new(file, "multipart/form-data", File.basename(app_file_path))
    
        request['X-KNOX-APITOKEN'] = access_token
    
        UI.message("⌛ Uploading the #{'APP'}.")
        response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end

        if response.is_a?(Net::HTTPSuccess)
          data = JSON.parse(response.body)
          UI.success(data)
        else
          raise "Request failed with response: #{response.body}"
        end
      end
    end
  end
end
