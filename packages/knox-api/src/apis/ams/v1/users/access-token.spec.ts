import 'dotenv/config';
import { generateSignedClientIdentifierJWT, generateBase64EncodedStringPublicKey } from '@redredgroup/samsungknox-token-library';
import { describe, expect, it } from 'vitest';
import { requestAccessToken } from './access-token';
import { KnoxRequestError } from '~/errors';
import * as jwt from 'jsonwebtoken';

describe('POST /v1/ams/accesstoken Test', () => {
  it('require args missing', async () => {
    let hasError = false;

    try {
      await requestAccessToken({
        region: 'TEST',
        base64EncodedStringPublicKey: '',
        clientIdentifierJwt: '',
        validityForAccessTokenInMinutes: 10,
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.code).toBe(0);
      }
    }

    expect(hasError).toBeTruthy();
  });

  it('unknown region', async () => {
    let hasError = false;

    try {
      await requestAccessToken({
        region: 'TEST',
        base64EncodedStringPublicKey: '',
        clientIdentifierJwt: '',
        validityForAccessTokenInMinutes: 10,
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.code).toBe(0);
      }
    }

    expect(hasError).toBeTruthy();
  });

  it('success access token', async () => {
    try {
      if (!process.env.CREDENTIAL_KEY || !process.env.CLIENT_IDENTIFIER_JWT_TOKEN) {
        throw new TypeError('env is missing');
      }

      const data = await generateSignedClientIdentifierJWT({
        credential: {
          key: process.env.CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: process.env.CLIENT_IDENTIFIER_JWT_TOKEN,
      });

      const { publicKey } = await generateBase64EncodedStringPublicKey({
        credential: {
          key: process.env.CREDENTIAL_KEY,
        },
      });

      const { result } = await requestAccessToken({
        region: 'US',
        base64EncodedStringPublicKey: publicKey,
        clientIdentifierJwt: data.accessToken,
        validityForAccessTokenInMinutes: 10,
      });

      const decodedToken = jwt.decode(result.accessToken);
      expect(Boolean(decodedToken)).toBe(true);
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
