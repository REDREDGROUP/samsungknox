import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcGetLicenses } from './get-licenses';
import {
  generateSignedClientIdentifierJWT,
  generateBase64EncodedStringPublicKey,
  generateSignedAccessTokenJWT,
} from '@redredgroup/samsungknox-token-library';
import { KcInstance, generateKnoxApiToken, requestAccessToken } from '~/apis';

describe('GET /kcs/v1/kc/licenses Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetLicenses({
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
      await kcGetLicenses({
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

  it('get license list', async () => {
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

      const getProfiles = await kcGetLicenses({
        region: 'EU',
        knoxAccessToken: accessToken,
        args: {},
      });

      expect(getProfiles).toHaveProperty('status', 'SUCCESS');
      expect(getProfiles).toHaveProperty('message', null);
      expect(getProfiles).toHaveProperty('result');
      expect(getProfiles.result).toHaveProperty('licenses');
      expect(getProfiles.result).toHaveProperty('totalCount');
      expect(Array.isArray(getProfiles.result.licenses)).toBe(true);
      expect(typeof getProfiles.result.totalCount).toBe('number');
    } catch (error: any) {
      throw new Error(error);
    }
  });
});

describe('(CLASS) GET /kcs/v1/kc/licenses Test', () => {
  it('get license list', async () => {
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

    const instance = new KcInstance({
      knoxAccessToken: accessToken,
      region: 'EU',
    });

    const getProfiles = await instance.v1.License.getLicense({
      args: {},
    });

    expect(getProfiles).toHaveProperty('status', 'SUCCESS');
    expect(getProfiles).toHaveProperty('message', null);
    expect(getProfiles).toHaveProperty('result');
    expect(getProfiles.result).toHaveProperty('licenses');
    expect(getProfiles.result).toHaveProperty('totalCount');
    expect(Array.isArray(getProfiles.result.licenses)).toBe(true);
    expect(typeof getProfiles.result.totalCount).toBe('number');
  });
});
