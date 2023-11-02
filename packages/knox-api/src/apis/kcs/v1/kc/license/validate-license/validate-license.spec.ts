import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcValidateLicense } from './validate-license';

describe('POST /kcs/v1/kc/licenses/validation Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcValidateLicense({
        region: 'US',
        knoxAccessToken: '',
        args: {
          licenseKey: 'TEST',
          licenseName: 'TEST',
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
      await kcValidateLicense({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          licenseKey: 'TEST',
          licenseName: 'TEST',
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
});
