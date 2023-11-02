import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcGenerateTrialLicense } from './generate-trial-license';

describe('GET /kcs/v1/kc/licenses/trial Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGenerateTrialLicense({
        region: 'US',
        knoxAccessToken: '',
        args: {
          licenseType: 'PER_SEAT',
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
      await kcGenerateTrialLicense({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          licenseType: 'PER_SEAT',
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
