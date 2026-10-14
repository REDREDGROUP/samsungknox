require 'net/http/post/multipart'
require 'uri'
require_relative 'knox_http_response'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxConfigureLibraryUploadApp
    class UploadFailed < StandardError
      attr_reader :application_id

      def initialize(application_id)
        @application_id = application_id
        super("Application #{application_id} processing failed")
      end
    end

    def self.upload_oauth_app(access_token, app_file_path, app_description)
      uri = URI('https://api.samsungknox.com/kc/v2/applications/inhouseApplications')
      uri.query = URI.encode_www_form(description: app_description) unless app_description.nil?
      File.open(app_file_path, 'rb') do |file|
        request = Net::HTTP::Post::Multipart.new(uri, "file" => UploadIO.new(file, "application/vnd.android.package-archive", File.basename(app_file_path)))
        request['Authorization'] = "Bearer #{access_token}"
        response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 30, read_timeout: 30) do |http|
          http.request(request)
        end
        data = KnoxHttpResponse.parse(response, 'Application upload')
        application_id = data['applicationId']
        raise KnoxHttpResponse::InvalidResponse, 'Application upload returned an invalid applicationId' unless application_id.kind_of?(String) && !application_id.strip.empty?

        case data['status']
        when 'InProgress'
          UI.message("Application #{application_id} accepted; processing is in progress")
        when 'Deployable'
          UI.success("Application #{application_id} is deployable")
        when 'Failed'
          raise UploadFailed, application_id
        else
          raise KnoxHttpResponse::InvalidResponse, 'Application upload returned an invalid status'
        end
        data
      end
    end

    def self.upload_app(access_token, app_file_path, app_description, api_region)
      UI.header('Step: 📲 Upload Application to Knox Configure Library 📲 ')

      uri = URI("https://#{api_region}-kcs-api.samsungknox.com/kcs/v1/kc/applications/upload")

      File.open(app_file_path, 'rb') do |file|
        request = Net::HTTP::Post::Multipart.new(uri,
                                                 "file" => UploadIO.new(file, "multipart/form-data", File.basename(app_file_path)))

        request['X-KNOX-APITOKEN'] = access_token

        UI.message("⌛ Uploading the Application. Please wait a moment...")
        response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end

        if response.kind_of?(Net::HTTPSuccess)
          upload_response_body = KnoxHttpResponse.parse(response, 'Legacy application upload')
          success_response = upload_response_body['successResponse'][0]
          app_info = success_response['appInfo'][0]
          UI.success("🎉 Uploaded Application [#{app_info['name']}] v#{app_info['packageVersion']} successfully!")
        else
          begin
            upload_response_body = JSON.parse(response.body)
          rescue JSON::ParserError
            raise KnoxHttpResponse::RequestError.new('Legacy application upload', response.code)
          end
          raise KnoxHttpResponse::RequestError.new('Legacy application upload', response.code) unless upload_response_body.kind_of?(Hash)

          if upload_response_body['data'].kind_of?(String) && upload_response_body['data'].strip == 'APP_BINARY_EXISTS'
            UI.success("✅ The same Application was found in release with no changes, skipping.")
          else
            raise KnoxHttpResponse::RequestError.new('Legacy application upload', response.code)
          end
        end
      end
    end
  end
end
