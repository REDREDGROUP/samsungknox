import axios from 'axios';
import { KnoxOAuthScopeInput } from '../types';

export type RequestOAuthAccessTokenParams = {
  clientId: string;
  clientSecret: string;
  scope: KnoxOAuthScopeInput;
  expiresIn?: number;
  endpoint?: string;
};

export type OAuthAccessTokenResponse = {
  accessToken: string;
  expiresIn: number;
  scope: string;
  tokenType: string;
};

type KnoxOAuthAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

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
    const { data } = await axios.post<KnoxOAuthAccessTokenResponse>(params.endpoint ?? DEFAULT_OAUTH_TOKEN_ENDPOINT, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      scope: data.scope,
      tokenType: data.token_type,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to request Knox OAuth access token. status=${error.response?.status ?? 'unknown'}`);
    }

    throw error;
  }
};
