import * as jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { EXAMPLE_CREDENTIAL_KEY, EXAMPLE_CREDENTIAL_KEY_PATH, EXAMPLE_JWT_TOKEN } from './__test__';
import knoxTokenLibrary, { v1, v2 } from './index';

describe('Credential Functions', () => {
  describe('exports', () => {
    it('should expose v1 and v2 namespaces', () => {
      expect(v1.generateSignedClientIdentifierJWT).toEqual(expect.any(Function));
      expect(v1.generateSignedAccessTokenJWT).toEqual(expect.any(Function));
      expect(v1.generateBase64EncodedStringPublicKey).toEqual(expect.any(Function));
      expect(v2.requestOAuthAccessToken).toEqual(expect.any(Function));
      expect(v2.oauthScopes).toContain('kc.devices:view');
    });

    it('should expose v1 and v2 from the default export', () => {
      expect(knoxTokenLibrary.v1).toBe(v1);
      expect(knoxTokenLibrary.v2).toBe(v2);
    });
  });

  describe('generateSignedClientIdentifierJWT', () => {
    it('should generate a signed client identifier JWT (With Credential Path)', async () => {
      const result = await v1.generateSignedClientIdentifierJWT({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
        clientIdentifierJwtToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed client identifier JWT (With Credential Key)', async () => {
      const result = await v1.generateSignedClientIdentifierJWT({
        credential: {
          key: EXAMPLE_CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed client identifier JWT from v1 namespace', async () => {
      const result = await v1.generateSignedClientIdentifierJWT({
        credential: {
          key: EXAMPLE_CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });
  });

  describe('generateSignedAccessTokenJWT', () => {
    it('should generate a signed access token JWT (With Credential Path)', async () => {
      const result = await v1.generateSignedAccessTokenJWT({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
        accessToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed access token JWT (With Credential Key)', async () => {
      const result = await v1.generateSignedAccessTokenJWT({
        credential: {
          key: EXAMPLE_CREDENTIAL_KEY,
        },
        accessToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });
  });

  describe('generateBase64EncodedStringPublicKey', () => {
    it('should generate a Base64 encoded string public key (With Credential Path)', async () => {
      const result = await v1.generateBase64EncodedStringPublicKey({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
      });
      expect(result).toHaveProperty('publicKey');
    });

    it('should generate a Base64 encoded string public key (With Credential Key)', async () => {
      const result = await v1.generateBase64EncodedStringPublicKey({
        credential: {
          key: EXAMPLE_CREDENTIAL_KEY,
        },
      });
      expect(result).toHaveProperty('publicKey');
    });
  });
});
