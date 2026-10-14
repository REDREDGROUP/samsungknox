require 'json'
require 'net/http'

module Fastlane
  module KnoxHttpResponse
    class RequestError < StandardError
      attr_reader :status

      def initialize(operation, status)
        @status = status
        super("#{operation} failed (HTTP #{status})")
      end
    end

    class InvalidResponse < StandardError
    end

    def self.parse(response, operation)
      raise RequestError.new(operation, response.code) unless response.kind_of?(Net::HTTPSuccess)

      data = JSON.parse(response.body)
      raise InvalidResponse, "#{operation} returned an invalid response" unless data.kind_of?(Hash)

      data
    rescue JSON::ParserError
      raise InvalidResponse, "#{operation} returned invalid JSON"
    end
  end
end
