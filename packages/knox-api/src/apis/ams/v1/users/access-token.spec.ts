import 'dotenv/config';
import { v1 } from '@redredgroup/samsungknox-token-library';
import * as jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { requestAccessToken } from './access-token';

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

      const data = await v1.generateSignedClientIdentifierJWT({
        credential: {
          key: process.env.CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: process.env.CLIENT_IDENTIFIER_JWT_TOKEN,
      });

      const { publicKey } = await v1.generateBase64EncodedStringPublicKey({
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
