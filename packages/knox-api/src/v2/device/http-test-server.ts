import { once } from 'node:events';
import { createServer, type IncomingHttpHeaders } from 'node:http';

type ReceivedRequest = {
  readonly method: string | undefined;
  readonly url: string | undefined;
  readonly headers: IncomingHttpHeaders;
  readonly body: string;
};

type HttpFixture = {
  readonly status?: number;
  readonly body?: unknown;
};

export async function withHttpFixture(fixture: HttpFixture, run: (baseURL: string, received: Promise<ReceivedRequest>) => Promise<void>): Promise<void> {
  const received = Promise.withResolvers<ReceivedRequest>();
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.once('end', () => {
      received.resolve({ method: request.method, url: request.url, headers: request.headers, body: Buffer.concat(chunks).toString('utf8') });
      response.writeHead(fixture.status ?? 200, { 'Content-Type': 'application/json' });
      response.end(fixture.body === undefined ? undefined : JSON.stringify(fixture.body));
    });
  });
  try {
    const listening = once(server, 'listening', { signal: AbortSignal.timeout(5000) });
    server.listen(0, '127.0.0.1');
    await listening;
    const address = server.address();
    if (address === null || typeof address === 'string') {
      throw new TypeError('Test server must have a TCP address.');
    }
    await run(`http://127.0.0.1:${address.port}`, received.promise);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}
