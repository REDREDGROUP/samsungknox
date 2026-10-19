import { once } from 'node:events';
import { createServer, type RequestListener } from 'node:http';
import { inspect } from 'node:util';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { createKnoxV2Axios, type KnoxConfigureOptions, type KnoxV2Request, KnoxV2RequestError } from './transport';

async function withServer(handler: RequestListener, run: (baseURL: string) => Promise<void>): Promise<void> {
  const server = createServer(handler);
  try {
    const listening = once(server, 'listening');
    server.listen(0, '127.0.0.1');
    await listening;
    const address = server.address();
    if (address === null || typeof address === 'string') {
      throw new TypeError('Test server must have a TCP address.');
    }
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe('Configure v2 transport', () => {
  it('uses the global host and bounded timeout when only a token is supplied', () => {
    // Given
    const options: KnoxConfigureOptions = { accessToken: 'opaque-token' };
    // When
    const client = createKnoxV2Axios(options);
    // Then
    expect(client.defaults.baseURL).toBe('https://api.samsungknox.com');
    expect(client.defaults.timeout).toBe(30000);
    expect(client.defaults.headers.Authorization).toBe('Bearer opaque-token');
    expect(client.defaults.headers['x-wsm-managed-tenantid']).toBeUndefined();
    expect(client.defaults.headers['X-KNOX-APITOKEN']).toBeUndefined();
    expect(client.defaults.headers.common['Content-Type']).toBeUndefined();
    expectTypeOf<KnoxV2Request<{ readonly pageSize: number }>>().toExtend<KnoxConfigureOptions>();
  });

  it.each([undefined, 'customer-id'])('sends Bearer and optional MSP headers over HTTP when tenant is %s', async (managedTenantId) => {
    // Given
    await withServer(
      (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ headers: request.headers, path: request.url, method: request.method }));
      },
      async (baseURL) => {
        const client = createKnoxV2Axios({
          accessToken: 'opaque-token',
          baseURL,
          timeout: 4321,
          ...(managedTenantId !== undefined && { managedTenantId }),
        });
        // When
        const response = await client.post<{ headers: Record<string, string>; path: string; method: string }>('/kc/v2/devices/getDevices', { pageSize: 1 });
        // Then
        expect(response.data.headers.authorization).toBe('Bearer opaque-token');
        expect(response.data.headers['x-wsm-managed-tenantid']).toBe(managedTenantId);
        expect(response.data.headers['x-knox-apitoken']).toBeUndefined();
        expect(response.data.headers['content-type']).toBe('application/json');
        expect(response.data.path).toBe('/kc/v2/devices/getDevices');
        expect(response.data.method).toBe('POST');
        expect(client.defaults.timeout).toBe(4321);
      },
    );
  });

  it('preserves the documented diagnostics when a structured HTTP error occurs', async () => {
    // Given
    await withServer(
      (_request, response) => {
        response.writeHead(403, { 'Content-Type': 'application/json', 'Set-Cookie': 'secret-cookie' });
        response.end(JSON.stringify({ code: 40300000, errorId: 'trace-123', message: 'response-secret', data: 'private-data' }));
      },
      async (baseURL) => {
        const client = createKnoxV2Axios({ accessToken: 'request-secret', baseURL });
        // When
        const error: unknown = await client.get('/kc/v2/profiles?token=query-secret').catch((failure: unknown) => failure);
        // Then
        expect(error).toBeInstanceOf(KnoxV2RequestError);
        expect(error).toMatchObject({ status: 403, code: 40300000, errorId: 'trace-123' });
        const diagnostics = `${inspect(error, { showHidden: true })} ${JSON.stringify(error)}`;
        for (const secret of ['request-secret', 'query-secret', 'response-secret', 'private-data', 'secret-cookie']) {
          expect(diagnostics).not.toContain(secret);
        }
        expect(error).not.toHaveProperty('cause');
        expect(error).not.toHaveProperty('config');
        expect(error).not.toHaveProperty('response');
      },
    );
  });

  it.each([
    ['text/html', '<html>response-secret</html>'],
    ['application/json', 'null'],
    ['application/json', '{"code":"response-secret","errorId":{"token":"response-secret"}}'],
    ['application/json', '{"code":40000000,"errorId":"request-secret"}'],
    ['application/json', '{"errorId":"Bearer response-secret"}'],
  ])('retains HTTP status without exposing unsafe fields when the body is %s %s', async (contentType, body) => {
    // Given
    await withServer(
      (_request, response) => {
        response.writeHead(502, { 'Content-Type': contentType });
        response.end(body);
      },
      async (baseURL) => {
        const client = createKnoxV2Axios({ accessToken: 'request-secret', baseURL });
        // When
        const error: unknown = await client.get('/kc/v2/profiles').catch((failure: unknown) => failure);
        // Then
        expect(error).toBeInstanceOf(KnoxV2RequestError);
        expect(error).toMatchObject({ status: 502, errorId: undefined });
        expect(inspect(error, { showHidden: true })).not.toContain('response-secret');
        expect(inspect(error, { showHidden: true })).not.toContain('request-secret');
      },
    );
  });

  it('returns a safe network diagnostic when the server drops the connection', async () => {
    // Given
    await withServer(
      (request) => request.socket.destroy(),
      async (baseURL) => {
        const client = createKnoxV2Axios({ accessToken: 'request-secret', baseURL });
        // When
        const error: unknown = await client.get('/kc/v2/profiles').catch((failure: unknown) => failure);
        // Then
        expect(error).toBeInstanceOf(KnoxV2RequestError);
        expect(error).toMatchObject({ status: undefined, code: 'ECONNRESET', errorId: undefined });
        expect(inspect(error, { showHidden: true })).not.toContain('request-secret');
        expect(error).not.toHaveProperty('cause');
      },
    );
  });

  it('preserves a partial success body when HTTP status is 207', async () => {
    // Given
    const body = { successes: ['device-1'], failures: [{ deviceId: 'device-2', code: 40000000 }] };
    await withServer(
      (_request, response) => {
        response.writeHead(207, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(body));
      },
      async (baseURL) => {
        const client = createKnoxV2Axios({ accessToken: 'opaque-token', baseURL });
        // When
        const response = await client.post('/kc/v2/devices/bulkDelete', { deviceIds: ['device-1', 'device-2'] });
        // Then
        expect(response.status).toBe(207);
        expect(response.data).toEqual(body);
      },
    );
  });
});
