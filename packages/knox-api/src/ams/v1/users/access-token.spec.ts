import { describe, expect, it } from 'vitest';
import { requestAccessToken } from './access-token';
import { ERROR_MAP, KnoxRequestError } from '../../../knox-axios.error';

describe('POST /v1/ams/accesstoken Test', () => {
  it('require args missing', async () => {
    let hasError = false;

    try {
      await requestAccessToken({
        region: 'US',
        base64EncodedStringPublicKey: '',
        clientIdentifierJwt: '',
        validityForAccessTokenInMinutes: 10,
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.message).toMatch(ERROR_MAP[4000000]);
        expect(error.code).toBe(4000000);
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
});