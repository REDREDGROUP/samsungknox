import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcGetLicenses } from './get-licenses';

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
});
