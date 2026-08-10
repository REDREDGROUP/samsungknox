import axios from 'axios';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { KnoxOAuthScope } from '../types';
import { requestOAuthAccessToken } from './request-oauth-access-token';

describe('requestOAuthAccessToken', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should request an OAuth access token with client credentials', async () => {
    const post = vi.spyOn(axios, 'post').mockResolvedValue({
      data: {
        access_token: 'test-access-token',
        expires_in: 599,
        scope: 'kc',
        token_type: 'Bearer',
      },
    } as Awaited<ReturnType<typeof axios.post>>);

    const result = await requestOAuthAccessToken({
      clientId: 'client-id',
      clientSecret: 'client-secret',
      scope: 'kc',
      expiresIn: 599,
    });

    expect(result).toEqual({
      accessToken: 'test-access-token',
      expiresIn: 599,
      scope: 'kc',
      tokenType: 'Bearer',
    });

    const [endpoint, body, config] = post.mock.calls[0];
    expect(endpoint).toBe('https://api.samsungknox.com/ams/v1/oauth2/token');
    expect(config?.headers).toEqual({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    expect(body).toBeInstanceOf(URLSearchParams);
    const searchParams = body as URLSearchParams;
    expect(searchParams.get('grant_type')).toBe('client_credentials');
    expect(searchParams.get('client_id')).toBe('client-id');
    expect(searchParams.get('client_secret')).toBe('client-secret');
    expect(searchParams.get('scope')).toBe('kc');
    expect(searchParams.get('expires_in')).toBe('599');
  });

  it('should throw an error when OAuth token request fails', async () => {
    vi.spyOn(axios, 'post').mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 401,
      },
    });

    await expect(
      requestOAuthAccessToken({
        clientId: 'client-id',
        clientSecret: 'client-secret',
        scope: 'kc',
      }),
    ).rejects.toThrow('Failed to request Knox OAuth access token. status=401');
  });

  it('should serialize multiple OAuth scopes', async () => {
    const post = vi.spyOn(axios, 'post').mockResolvedValue({
      data: {
        access_token: 'test-access-token',
        expires_in: 599,
        scope: 'kc.devices:view kc.profile:view',
        token_type: 'Bearer',
      },
    } as Awaited<ReturnType<typeof axios.post>>);

    await requestOAuthAccessToken({
      clientId: 'client-id',
      clientSecret: 'client-secret',
      scope: ['kc.devices:view', 'kc.profile:view'],
    });

    const [, body] = post.mock.calls[0];
    expect(body).toBeInstanceOf(URLSearchParams);
    expect((body as URLSearchParams).get('scope')).toBe('kc.devices:view kc.profile:view');
  });

  it('should only accept documented OAuth scope types', () => {
    expectTypeOf<'kc.devices:view'>().toExtend<KnoxOAuthScope>();
    expectTypeOf<'unknown.scope'>().not.toExtend<KnoxOAuthScope>();
  });
});
