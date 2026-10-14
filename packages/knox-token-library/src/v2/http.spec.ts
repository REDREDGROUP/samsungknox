import { createServer } from 'node:http';
import { inspect } from 'node:util';
import { describe, expect, it } from 'vitest';
import { requestOAuthAccessToken } from './request-oauth-access-token';

type ReceivedRequest = {
  readonly method: string | undefined;
  readonly url: string | undefined;
  readonly contentType: string | undefined;
  readonly body: string;
};

const token = { access_token: 'opaque-token', expires_in: 599, scope: 'kc', token_type: 'Bearer' } as const;
const clientSecret = 'secret+ &=%\uD55C\uAE00';

async function withTokenServer(
  response: { readonly status: number; readonly body: string },
  run: (endpoint: string, received: Promise<ReceivedRequest>) => Promise<void>,
) {
  const { promise: received, resolve } = Promise.withResolvers<ReceivedRequest>();
  const server = createServer((request, result) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => {
      resolve({
        method: request.method,
        url: request.url,
        contentType: request.headers['content-type'],
        body: Buffer.concat(chunks).toString('utf8'),
      });
      result.writeHead(response.status, { 'Content-Type': 'application/json', Location: '/must-not-follow' });
      result.end(response.body);
    });
  });
  try {
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    if (address === null || typeof address === 'string') throw new TypeError('Expected TCP test server');
    await run(`http://127.0.0.1:${address.port}/custom/token`, received);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

describe('OAuth over HTTP', () => {
  it.each([undefined, 599])('encodes credentials and scopes at the overridden endpoint when expiresIn is %s', async (expiresIn) => {
    // Given
    await withTokenServer({ status: 200, body: JSON.stringify(token) }, async (endpoint, received) => {
      // When
      const result = await requestOAuthAccessToken({
        endpoint,
        clientId: 'id+ &=%\uD55C\uAE00',
        clientSecret,
        scope: ['kc.devices:view', 'kc.application:manage', 'kc.content:manage'],
        ...(expiresIn === undefined ? {} : { expiresIn }),
      });
      // Then
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/custom/token');
      expect(request.contentType).toBe('application/x-www-form-urlencoded');
      const form = new URLSearchParams(request.body);
      expect(Object.fromEntries(form)).toEqual({
        grant_type: 'client_credentials',
        client_id: 'id+ &=%\uD55C\uAE00',
        client_secret: clientSecret,
        scope: 'kc.devices:view kc.application:manage kc.content:manage',
        ...(expiresIn === undefined ? {} : { expires_in: '599' }),
      });
      expect(result).toEqual({ accessToken: 'opaque-token', expiresIn: 599, scope: 'kc', tokenType: 'Bearer' });
    });
  });

  it.each([
    ['malformed JSON', '{"access_token":'],
    ['null', 'null'],
    ['array', '[]'],
    ['missing fields', '{}'],
    ['wrong token type', JSON.stringify({ ...token, token_type: 'Basic' })],
    ['wrong expiration type', JSON.stringify({ ...token, expires_in: '599' })],
    ['fractional expiration', JSON.stringify({ ...token, expires_in: 1.5 })],
    ['wrong access token type', JSON.stringify({ ...token, access_token: 123 })],
    ['empty access token', JSON.stringify({ ...token, access_token: '' })],
    ['blank access token', JSON.stringify({ ...token, access_token: ' ' })],
    ['CRLF access token', JSON.stringify({ ...token, access_token: 'token\r\nHeader: value' })],
    ['whitespace in access token', JSON.stringify({ ...token, access_token: 'token value' })],
    ['control character in access token', JSON.stringify({ ...token, access_token: 'token\u0000value' })],
    ['wrong scope type', JSON.stringify({ ...token, scope: [] })],
  ])('rejects %s when the server returns HTTP 200', async (_label, body) => {
    // Given
    await withTokenServer({ status: 200, body }, async (endpoint) => {
      // When
      const result = requestOAuthAccessToken({ endpoint, clientId: 'client', clientSecret, scope: 'kc' });
      // Then
      await expect(result).rejects.toMatchObject({ name: 'KnoxOAuthTokenError', code: 'INVALID_RESPONSE', status: 200 });
    });
  });

  it('preserves opaque bearer token characters without requiring JWT syntax', async () => {
    // Given
    const response = { ...token, access_token: 'opaque.~_+/-==' };
    await withTokenServer({ status: 200, body: JSON.stringify(response) }, async (endpoint) => {
      // When
      const result = await requestOAuthAccessToken({ endpoint, clientId: 'client', clientSecret, scope: 'kc' });
      // Then
      expect(result.accessToken).toBe(response.access_token);
    });
  });

  it.each([302, 400, 401, 403, 429, 500])('preserves HTTP %s without exposing credentials when the server rejects the request', async (status) => {
    // Given
    await withTokenServer({ status, body: JSON.stringify({ error: clientSecret, error_description: clientSecret }) }, async (endpoint) => {
      // When
      const result = requestOAuthAccessToken({ endpoint, clientId: 'client', clientSecret, scope: 'kc' });
      // Then
      await expect(result).rejects.toMatchObject({ name: 'KnoxOAuthTokenError', code: 'REQUEST_FAILED', status });
      try {
        await result;
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        expect(`${error.message}\n${error.stack}\n${JSON.stringify(error)}\n${inspect(error, { depth: 10 })}`).not.toContain(clientSecret);
        expect(inspect(error, { depth: 10 })).not.toContain(new URLSearchParams({ client_secret: clientSecret }).toString());
        expect(error).not.toHaveProperty('config');
        expect(error).not.toHaveProperty('cause');
        expect(error).not.toHaveProperty('response');
      }
    });
  });
});
