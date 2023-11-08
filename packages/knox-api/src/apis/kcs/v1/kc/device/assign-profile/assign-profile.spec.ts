import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcAssignProfileDevices } from './assign-profile';

describe('PUT /kcs/v1/kc/devices/assign Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcAssignProfileDevices({
        region: 'US',
        knoxAccessToken: '',
        args: {
          assignFeature: {
            licenseId: 'TEST',
            licenseKey: 'TEST',
            profileId: 'TEST',
            profileName: 'TEST',
            replaceLicense: false,
          },
          deviceIds: ['TEST'],
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
      await kcAssignProfileDevices({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          assignFeature: {
            licenseId: 'TEST',
            licenseKey: 'TEST',
            profileId: 'TEST',
            profileName: 'TEST',
            replaceLicense: false,
          },
          deviceIds: ['TEST'],
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
