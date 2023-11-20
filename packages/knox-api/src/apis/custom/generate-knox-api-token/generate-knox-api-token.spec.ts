import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import * as jwt from 'jsonwebtoken';
import { ERRORS } from '@redredgroup/samsungknox-token-library/src/common';
import { generateKnoxApiToken } from './generate-knox-api-token';
import { kcGetProfiles } from '~/apis';

describe('CUSTOM generate knox api token Test', () => {
  it('credential key missing', async () => {
    await expect(
      generateKnoxApiToken({
        credential: {
          credentialKey: '',
        },
        clientIdentifierJwtToken: '',
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_MISSING);
  });

  it('credential path is invalid', async () => {
    await expect(
      generateKnoxApiToken({
        credential: {
          credentialPath: 'credential.unknown',
        },
        clientIdentifierJwtToken: '',
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_IS_NOT_JSON_TYPE);
  });

  it('credential key is invalid', async () => {
    await expect(
      generateKnoxApiToken({
        credential: {
          credentialKey: 'credential.unknown',
        },
        clientIdentifierJwtToken: '',
      }),
    ).rejects.toThrow(ERRORS.CREDENTIAL_IS_NOT_JSON_TYPE);
  });

  describe('generate accessToken and accessToken test', async () => {
    try {
      if (!process.env.CREDENTIAL_KEY || !process.env.CLIENT_IDENTIFIER_JWT_TOKEN) {
        throw new TypeError('env is missing');
      }

      const knoxApiToken = await generateKnoxApiToken({
        credential: {
          credentialKey: process.env.CREDENTIAL_KEY,
        },
        clientIdentifierJwtToken: process.env.CLIENT_IDENTIFIER_JWT_TOKEN,
      });

      expect(knoxApiToken).toHaveProperty('accessToken');
      const decodedToken = jwt.decode(knoxApiToken.accessToken);
      expect(Boolean(decodedToken)).toBe(true);

      it('get profile list', async () => {
        const getProfiles = await kcGetProfiles({
          region: 'EU',
          knoxAccessToken: knoxApiToken.accessToken,
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
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
