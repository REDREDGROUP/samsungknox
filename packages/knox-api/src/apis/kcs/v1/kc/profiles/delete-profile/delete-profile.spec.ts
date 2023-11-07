import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcDeleteProfile } from './delete-profile';

describe('DELETE /kcs/v1/kc/profile Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcDeleteProfile({
        region: 'US',
        knoxAccessToken: '',
        args: {
          profileIds: ['TEST'],
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
      await kcDeleteProfile({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          profileIds: ['TEST'],
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
