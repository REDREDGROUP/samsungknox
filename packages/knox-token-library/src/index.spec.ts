import { ERRORS } from './common';
import { generateBase64EncodedStringPublicKey, generateSignedAccessTokenJWT, generateSignedClientIdentifierJWT } from './index';
import { describe, expect, it } from 'vitest';
import * as jwt from 'jsonwebtoken';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';
const CREDENTIAL_KEY = process.env.CREDENTIAL_TEST_KEY || '';

describe('Credential Functions', () => {
  describe('generateSignedClientIdentifierJWT', () => {
    it('should generate a signed client identifier JWT (With Credential Path)', async () => {
      const result = await generateSignedClientIdentifierJWT({
        credential: {
          path: 'credential.json',
        },
        clientIdentifierJwtToken: JWT_TOKEN_KEY,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed client identifier JWT (With Credential Key)', async () => {
      const result = await generateSignedClientIdentifierJWT({
        credential: {
          key: CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: JWT_TOKEN_KEY,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });
  });

  describe('generateSignedAccessTokenJWT', () => {
    it('should generate a signed access token JWT (With Credential Path)', async () => {
      const result = await generateSignedAccessTokenJWT({
        credential: {
          path: 'credential.json',
        },
        accessToken: JWT_TOKEN_KEY,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });

    it('should generate a signed access token JWT (With Credential Key)', async () => {
      const result = await generateSignedAccessTokenJWT({
        credential: {
          key: CREDENTIAL_KEY,
        },
        accessToken: JWT_TOKEN_KEY,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    });
  });

  describe('generateBase64EncodedStringPublicKey', () => {
    it('should generate a Base64 encoded string public key (With Credential Path)', async () => {
      const result = await generateBase64EncodedStringPublicKey({
        credential: {
          path: 'credential.json',
        },
      });
      expect(result).toHaveProperty('publicKey');
    });

    it('should generate a Base64 encoded string public key (With Credential Key)', async () => {
      const result = await generateBase64EncodedStringPublicKey({
        credential: {
          key: CREDENTIAL_KEY,
        },
      });
      expect(result).toHaveProperty('publicKey');
    });
  });
});
