import { generateBase64EncodedStringPublicKey, generateSignedAccessTokenJWT, generateSignedClientIdentifierJWT } from './index';
import { describe, expect, it } from 'vitest';
import * as jwt from 'jsonwebtoken';
import { EXAMPLE_CREDENTIAL_KEY, EXAMPLE_CREDENTIAL_KEY_PATH, EXAMPLE_JWT_TOKEN } from './__test__';

describe('Credential Functions', () => {
  describe('generateSignedClientIdentifierJWT', () => {
    it('should generate a signed client identifier JWT (With Credential Path)', async () => {
      const result = await generateSignedClientIdentifierJWT({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
        clientIdentifierJwtToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed client identifier JWT (With Credential Key)', async () => {
      const result = await generateSignedClientIdentifierJWT({
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
      const result = await generateSignedAccessTokenJWT({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
        accessToken: EXAMPLE_JWT_TOKEN,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed access token JWT (With Credential Key)', async () => {
      const result = await generateSignedAccessTokenJWT({
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
      const result = await generateBase64EncodedStringPublicKey({
        credential: {
          path: EXAMPLE_CREDENTIAL_KEY_PATH,
        },
      });
      expect(result).toHaveProperty('publicKey');
    });

    it('should generate a Base64 encoded string public key (With Credential Key)', async () => {
      const result = await generateBase64EncodedStringPublicKey({
        credential: {
          key: EXAMPLE_CREDENTIAL_KEY,
        },
      });
      expect(result).toHaveProperty('publicKey');
    });
  });
});
