import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';
import { KnoxInstance, kcGetMediaFile } from '~/apis';

describe('GET /kcs/v1/kc/assets/${contentId} Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcGetMediaFile({
        region: 'US',
        knoxAccessToken: '',
        args: {
          contentId: '',
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
      await kcGetMediaFile({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          contentId: '',
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

describe('CLASS GET /kcs/v1/kc/assets/${contentId} Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      const instance = new KnoxInstance({
        knoxAccessToken: '',
        region: 'US',
      });

      await instance.kcContentManagementAsset.getMediaFile({
        args: {
          contentId: '',
        },
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.message).toMatch(ERROR_MESSAGES.KNOX_ACCESS_TOKEN_MISSING);
        expect(error.code).toBe(0);
      }
    }

    expect(hasError).toBeTruthy();
  });

  it('unknown region', async () => {
    let hasError = false;

    try {
      const instance = new KnoxInstance({
        knoxAccessToken: 'asd',
        region: 'TEST',
      });

      await instance.kcContentManagementAsset.getMediaFile({
        args: {
          contentId: '',
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
