import { once } from 'node:events';
import { createServer, type IncomingHttpHeaders } from 'node:http';

export type ReceivedRequest = {
  readonly method: string | undefined;
  readonly url: URL;
  readonly headers: IncomingHttpHeaders;
  readonly body: Buffer;
};

export async function withHttpServer(
  reply: { readonly status?: number; readonly body?: unknown },
  run: (fixture: { readonly baseURL: string; readonly received: Promise<ReceivedRequest> }) => Promise<void>,
): Promise<void> {
  const received = Promise.withResolvers<ReceivedRequest>();
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.once('end', () => {
      received.resolve({
        method: request.method,
        url: new URL(request.url ?? '/', 'http://localhost'),
        headers: request.headers,
        body: Buffer.concat(chunks),
      });
      response.writeHead(reply.status ?? 200, { 'Content-Type': 'application/json' });
      response.end(reply.body === undefined ? undefined : JSON.stringify(reply.body));
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
    await run({ baseURL: `http://127.0.0.1:${address.port}`, received: received.promise });
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}
