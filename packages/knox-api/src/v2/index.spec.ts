import { once } from 'node:events';
import { createServer } from 'node:http';
import { describe, expect, it } from 'vitest';
import { KnoxConfigureClient, v2 } from '../index';

describe('public Configure v2 client', () => {
  it('routes every domain through the shared OAuth transport when using root or namespace exports', async () => {
    // Given
    const requests: { readonly method: string | undefined; readonly path: string; readonly token: string | undefined; readonly legacy: string | undefined }[] = [];
    const server = createServer((request, response) => {
      requests.push({
        method: request.method,
        path: request.url ?? '',
        token: request.headers.authorization,
        legacy: request.headers['x-knox-apitoken']?.toString(),
      });
      request.resume();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ path: request.url }));
    });
    try {
      const listening = once(server, 'listening', { signal: AbortSignal.timeout(5000) });
      server.listen(0, '127.0.0.1');
      await listening;
      const address = server.address();
      if (address === null || typeof address === 'string') throw new TypeError('Expected a TCP test server');
      const options = { accessToken: 'facade-token', baseURL: `http://127.0.0.1:${address.port}` };
      const client = new KnoxConfigureClient(options);
      const namespaceClient = new v2.KnoxConfigureClient(options);
      // When
      const results = await Promise.all([
        client.device.getDevices({ pageSize: 1 }),
        client.profiles.getProfiles(),
        client.license.getLicenses(),
        client.application.getApplications(),
        client.content.generateContentDownloadUrl({ contentId: 'content-id' }),
        namespaceClient.device.getDevices({ pageSize: 1 }),
        v2.kcV2GetDevices({ ...options, args: { pageSize: 1 } }),
      ]);
      // Then
      const paths = [
        '/kc/v2/devices/getDevices',
        '/kc/v2/profiles',
        '/kc/v2/licenses',
        '/kc/v2/applications',
        '/kc/v2/contents/content-id/downloadUrl',
        '/kc/v2/devices/getDevices',
        '/kc/v2/devices/getDevices',
      ];
      expect(results).toEqual(paths.map((path) => ({ path })));
      expect(requests.map(({ method, path }) => ({ method, path })).sort((a, b) => a.path.localeCompare(b.path))).toEqual(
        paths.map((path, index) => ({ method: [0, 4, 5, 6].includes(index) ? 'POST' : 'GET', path })).sort((a, b) => a.path.localeCompare(b.path)),
      );
      expect(requests.every(({ token, legacy }) => token === 'Bearer facade-token' && legacy === undefined)).toBe(true);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
  });
});
