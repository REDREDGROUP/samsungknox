import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcGetProfiles } from './get-profiles';
import {
  generateSignedClientIdentifierJWT,
  generateBase64EncodedStringPublicKey,
  generateSignedAccessTokenJWT,
} from '@redredgroup/samsungknox-token-library';
import { requestAccessToken } from 'src/apis/ams';
import { KcInstance, generateKnoxApiToken } from '~/apis';

describe('GET /kcs/v1/kc/profiles Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetProfiles({
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
      await kcGetProfiles({
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

  it('get profile list', async () => {
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

    const getProfiles = await kcGetProfiles({
      region: 'EU',
      knoxAccessToken: accessToken,
      args: {},
    });

    expect(getProfiles).toHaveProperty('status', 'SUCCESS');
    expect(getProfiles).toHaveProperty('message', null);
    expect(getProfiles).toHaveProperty('result');
    expect(getProfiles.result).toHaveProperty('contents');
    expect(getProfiles.result).toHaveProperty('totalCount');
    expect(Array.isArray(getProfiles.result.contents)).toBe(true);
    expect(typeof getProfiles.result.totalCount).toBe('number');
  });
});

describe('(CLASS) GET /kcs/v1/kc/profiles Test', () => {
  it('get profile list', async () => {
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

    const getProfiles = await instance.v1.Profile.getProfiles({
      args: {},
    });

    expect(getProfiles).toHaveProperty('status', 'SUCCESS');
    expect(getProfiles).toHaveProperty('message', null);
    expect(getProfiles).toHaveProperty('result');
    expect(getProfiles.result).toHaveProperty('contents');
    expect(getProfiles.result).toHaveProperty('totalCount');
    expect(Array.isArray(getProfiles.result.contents)).toBe(true);
    expect(typeof getProfiles.result.totalCount).toBe('number');
  });
});
