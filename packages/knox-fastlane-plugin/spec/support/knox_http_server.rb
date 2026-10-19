require 'socket'
require 'timeout'

module KnoxHttpServer
  def with_http_responses(responses)
    server = TCPServer.new('127.0.0.1', 0)
    requests = []
    destinations = []
    worker = Thread.new do
      responses.each do |status, body|
        socket = server.accept
        begin
          request_line = socket.gets
          headers = {}
          while (line = socket.gets) && line != "\r\n"
            key, value = line.split(':', 2)
            headers[key.downcase] = value.strip
          end
          payload = socket.read(headers.fetch('content-length', '0').to_i)
          requests << { line: request_line, headers: headers, body: payload }
          socket.write("HTTP/1.1 #{status} Result\r\nContent-Type: application/json\r\nContent-Length: #{body.bytesize}\r\nConnection: close\r\n\r\n#{body}")
        ensure
          socket.close
        end
      end
    end
    allow(Net::HTTP).to receive(:start).and_wrap_original do |original, host, port, **options, &block|
      destinations << [host, port, options]
      original.call('127.0.0.1', server.addr[1], **options.merge(use_ssl: false), &block)
    end
    yield(requests, destinations)
    Timeout.timeout(5) { worker.value }
  ensure
    server&.close
    worker&.kill
    worker&.join
  end
end

RSpec.configure do |config|
  config.include(KnoxHttpServer)
end
