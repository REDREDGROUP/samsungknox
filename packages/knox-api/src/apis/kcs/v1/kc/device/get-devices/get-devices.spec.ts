import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';

import {
  generateSignedClientIdentifierJWT,
  generateBase64EncodedStringPublicKey,
  generateSignedAccessTokenJWT,
} from '@redredgroup/samsungknox-token-library';
import { kcGetDevices, requestAccessToken } from '~/apis';

describe('GET /kcs/v1/kc/licenses Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetDevices({
        region: 'US',
        knoxAccessToken: '',
        args: {},
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.message).toMatch('RESOURCE_INVALID_PARAM');
        expect(error.code).toBe(4000000);
      }
    }

    expect(hasError).toBeTruthy();
  });

  it('unknown region', async () => {
    let hasError = false;

    try {
      await kcGetDevices({
        region: 'TEST',
        knoxAccessToken: '',
        args: {},
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

  it('get devices list', async () => {
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
        region: 'EU',
        base64EncodedStringPublicKey: publicKey,
        clientIdentifierJwt: data.accessToken,
        validityForAccessTokenInMinutes: 10,
      });

      const { accessToken } = await generateSignedAccessTokenJWT({
        credential: {
          key: process.env.CREDENTIAL_KEY,
        },
        accessToken: result.accessToken,
      });

      const getDevices = await kcGetDevices({
        region: 'EU',
        knoxAccessToken: accessToken,
        args: {},
      });

      expect(getDevices).toHaveProperty('status', 'SUCCESS');
      expect(getDevices).toHaveProperty('message', null);
      expect(getDevices).toHaveProperty('result');
      expect(getDevices.result).toHaveProperty('deviceList');
      expect(getDevices.result).toHaveProperty('totalCount');
      expect(Array.isArray(getDevices.result.deviceList)).toBe(true);
      expect(typeof getDevices.result.totalCount).toBe('number');
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
