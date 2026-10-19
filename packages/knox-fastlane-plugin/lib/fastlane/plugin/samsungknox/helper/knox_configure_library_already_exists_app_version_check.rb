require 'net/http'
require 'uri'
require_relative 'knox_http_response'

module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxConfigureLibraryAlreadyExistsAppVersionCheck
    def self.search_by_package_name(access_token, package_name, api_region: 'eu')
      uri = URI("https://#{api_region.downcase}-kcs-api.samsungknox.com/kcs/v1/kc/applications")
      uri.query = URI.encode_www_form(packageName: package_name)

      request = Net::HTTP::Get.new(uri)
      request["Content-Type"] = "application/json"
      request["X-KNOX-APITOKEN"] = access_token

      response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https', open_timeout: 30, read_timeout: 30) do |http|
        http.request(request)
      end

      KnoxHttpResponse.parse(response, 'Legacy application search')
    end
  end
end
