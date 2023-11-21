import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';

import { generateKnoxApiToken, kcGetApplications, requestAccessToken } from '~/apis';

describe('GET /kcs/v1/kc/applications Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetApplications({
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
      await kcGetApplications({
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

      const { accessToken } = await generateKnoxApiToken({
        region: 'EU',
        credential: {
          credentialKey: process.env.CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: process.env.CLIENT_IDENTIFIER_JWT_TOKEN,
      });

      const getDevices = await kcGetApplications({
        region: 'EU',
        knoxAccessToken: accessToken,
        args: {},
      });

      expect(getDevices).toHaveProperty('status', 'SUCCESS');
      expect(getDevices).toHaveProperty('message', null);
      expect(getDevices).toHaveProperty('result');
      expect(getDevices.result).toHaveProperty('applications');
      expect(getDevices.result).toHaveProperty('totalCount');
      expect(Array.isArray(getDevices.result.applications)).toBe(true);
      expect(typeof getDevices.result.totalCount).toBe('number');
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
