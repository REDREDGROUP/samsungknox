import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcGetDeviceLogs } from './get-device-logs';
import {
  generateBase64EncodedStringPublicKey,
  generateSignedAccessTokenJWT,
  generateSignedClientIdentifierJWT,
} from '@redredgroup/samsungknox-token-library';
import { generateKnoxApiToken, requestAccessToken } from '~/apis';

describe('PUT /kcs/v1/kc/devices/unassign Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetDeviceLogs({
        region: 'US',
        knoxAccessToken: '',
        args: {
          deviceId: 'TEST',
        },
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
      await kcGetDeviceLogs({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          deviceId: 'TEST',
        },
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

  it('get devices logs', async () => {
    try {
      if (!process.env.CREDENTIAL_KEY || !process.env.CLIENT_IDENTIFIER_JWT_TOKEN || !process.env.DEVICE_ID) {
        throw new TypeError('env is missing');
      }

      const { accessToken } = await generateKnoxApiToken({
        region: 'EU',
        credential: {
          credentialKey: process.env.CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: process.env.CLIENT_IDENTIFIER_JWT_TOKEN,
      });

      const getDeviceLogs = await kcGetDeviceLogs({
        region: 'EU',
        knoxAccessToken: accessToken,
        args: {
          deviceId: process.env.DEVICE_ID,
        },
      });

      expect(getDeviceLogs).toHaveProperty('status', 'SUCCESS');
      expect(getDeviceLogs).toHaveProperty('message', null);
      expect(getDeviceLogs).toHaveProperty('result');
      expect(getDeviceLogs.result).toHaveProperty('deviceId');
      expect(getDeviceLogs.result).toHaveProperty('totalCount');
      expect(Array.isArray(getDeviceLogs.result.deviceLogs)).toBe(true);
      expect(typeof getDeviceLogs.result.totalCount).toBe('number');
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
