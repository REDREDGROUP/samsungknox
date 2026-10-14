import { KNOX_OAUTH_SCOPES } from './types';
import { generateBase64EncodedStringPublicKey } from './v1/generate-base64-encoded-string-public-key';
import { generateSignedAccessTokenJWT } from './v1/generate-signed-access-token-jwt';
import { generateSignedClientIdentifierJWT } from './v1/generate-signed-client-identifier-jwt';
import { KnoxOAuthTokenError, requestOAuthAccessToken } from './v2/request-oauth-access-token';

export type { KnoxOAuthScope, KnoxOAuthScopeInput } from './types';
export { KNOX_OAUTH_SCOPES } from './types';
export type { KnoxOAuthTokenErrorCode, OAuthAccessTokenResponse, RequestOAuthAccessTokenParams } from './v2/request-oauth-access-token';
export { KnoxOAuthTokenError } from './v2/request-oauth-access-token';

const v1 = {
  generateSignedClientIdentifierJWT,
  generateSignedAccessTokenJWT,
  generateBase64EncodedStringPublicKey,
};

const v2 = {
  oauthScopes: KNOX_OAUTH_SCOPES,
  requestOAuthAccessToken,
  KnoxOAuthTokenError,
};

export { v1, v2 };

const knoxTokenLibrary = {
  v1,
  v2,
};

export default knoxTokenLibrary;
