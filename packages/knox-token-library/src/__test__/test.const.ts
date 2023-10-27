import { generateExampleKey } from '../../scripts/generate-example-key';
import { generateExampleJwtToken } from '../../scripts/generate-example-jwt-token';

export const EXAMPLE_JWT_TOKEN = generateExampleJwtToken();
export const EXAMPLE_CREDENTIAL_KEY = generateExampleKey();
export const EXAMPLE_CREDENTIAL_KEY_PATH = 'example-credential.json';
export const PRIVATE_KEY_IS_MISSING_CASE = JSON.stringify({ Private: null, Public: 'test', Identifier: 'test' });
export const PUBLIC_KEY_IS_MISSING_CASE = JSON.stringify({ Private: 'test', Public: null, Identifier: 'test' });
export const IDENTIFIER_IS_MISSING_CASE = JSON.stringify({ Private: 'test', Public: 'test', Identifier: null });
export const BOTH_CREDENTIAL_DETECTED_CASE = { key: EXAMPLE_CREDENTIAL_KEY_PATH, path: 'example-credential' };
export const CREDENTIAL_TYPE_IS_NOT_JSON_CASE = { key: 'credential.unknown' };
export const CREDENTIAL_PATH_NOT_FOUND_CASE = { path: 'credential.unknown' };
export const IDENTIFIER_IS_NOT_JWT_TOKEN_CASE = { credential: { path: EXAMPLE_CREDENTIAL_KEY_PATH }, clientIdentifierJwtToken: 'invalidToken' };
