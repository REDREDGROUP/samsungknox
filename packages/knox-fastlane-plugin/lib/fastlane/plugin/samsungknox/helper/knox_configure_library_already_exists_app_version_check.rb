
module Fastlane
  UI = FastlaneCore::UI unless Fastlane.const_defined?("UI")

  module KnoxConfigureLibraryAlreadyExistsAppVersionCheck

    def self.search_by_package_name(access_token, package_name)
      uri = URI("https://eu-kcs-api.samsungknox.com/kcs/v1/kc/applications?packageName=#{package_name}")
    
      UI.message(access_token)
      request = Net::HTTP::Get.new(uri)
      request["Content-Type"] = "application/json"
      request["X-KNOX-APITOKEN"] = access_token
    
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.scheme == 'https' 

      response = http.request(request)

      if response.is_a?(Net::HTTPSuccess)
        data = JSON.parse(response.body)
        # UI.success(data)


        # UI.success('✅ ams accessToken generated successfully!')
        return data["accessToken"]
      else
        raise "Request failed with response: #{response.body}"
      end
    end
    
  end
end
