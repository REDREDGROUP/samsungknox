import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '../../../../../knox-axios.error';
import { getKnoxConfigureProfiles } from './get-profiles';

describe('GET /kcs/v1/kc/profiles Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await getKnoxConfigureProfiles({
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
      await getKnoxConfigureProfiles({
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
