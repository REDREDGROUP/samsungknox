import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcUnassignProfileDevices } from './unassign-profile';

describe('PUT /kcs/v1/kc/devices/unassign Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcUnassignProfileDevices({
        region: 'US',
        knoxAccessToken: '',
        args: {
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
      await kcUnassignProfileDevices({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
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
