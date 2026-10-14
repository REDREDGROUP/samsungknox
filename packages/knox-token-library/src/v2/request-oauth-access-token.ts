import axios from 'axios';
import type { KnoxOAuthScopeInput } from '../types';

export type RequestOAuthAccessTokenParams = {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scope: KnoxOAuthScopeInput;
  readonly expiresIn?: number;
  readonly endpoint?: string;
};

export type OAuthAccessTokenResponse = {
  readonly accessToken: string;
  readonly expiresIn: number;
  readonly scope: string;
  readonly tokenType: string;
};

export type KnoxOAuthTokenErrorCode = 'REQUEST_FAILED' | 'INVALID_RESPONSE';

export class KnoxOAuthTokenError extends Error {
  readonly name = 'KnoxOAuthTokenError';

  constructor(
    readonly code: KnoxOAuthTokenErrorCode,
    readonly status: number | undefined,
  ) {
    super(
      code === 'REQUEST_FAILED'
        ? `Failed to request Knox OAuth access token. status=${status ?? 'unknown'}`
        : `Invalid Knox OAuth access token response. status=${status ?? 'unknown'}`,
    );
  }
}

const DEFAULT_OAUTH_TOKEN_ENDPOINT = 'https://api.samsungknox.com/ams/v1/oauth2/token';

export const requestOAuthAccessToken = async (params: RequestOAuthAccessTokenParams): Promise<OAuthAccessTokenResponse> => {
  const scope = typeof params.scope === 'string' ? params.scope : params.scope.join(' ');
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: params.clientId,
    client_secret: params.clientSecret,
    scope,
  });

  if (params.expiresIn !== undefined) {
    body.set('expires_in', String(params.expiresIn));
  }

  try {
    const { data, status } = await axios.post<unknown>(params.endpoint ?? DEFAULT_OAUTH_TOKEN_ENDPOINT, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 30_000,
      // Do not forward credentials to a redirect target or hide the initial status.
      maxRedirects: 0,
    });

    // No schema dependency: narrow the external value before constructing the public result.
    if (
      typeof data !== 'object' ||
      data === null ||
      !('access_token' in data) ||
      typeof data.access_token !== 'string' ||
      !/^[A-Za-z0-9._~+/-]+=*$/.test(data.access_token) ||
      !('expires_in' in data) ||
      typeof data.expires_in !== 'number' ||
      !Number.isInteger(data.expires_in) ||
      !('scope' in data) ||
      typeof data.scope !== 'string' ||
      !('token_type' in data) ||
      data.token_type !== 'Bearer'
    ) {
      throw new KnoxOAuthTokenError('INVALID_RESPONSE', status);
    }

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      scope: data.scope,
      tokenType: data.token_type,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios errors retain the secret-bearing request config. Never attach them as a cause.
      throw new KnoxOAuthTokenError('REQUEST_FAILED', error.response?.status);
    }

    throw error;
  }
};
