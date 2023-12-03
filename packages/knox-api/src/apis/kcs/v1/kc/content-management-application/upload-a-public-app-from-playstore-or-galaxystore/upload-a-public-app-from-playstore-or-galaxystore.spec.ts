import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';
import { KcInstance, kcUploadAPublicAppFromPlayStoreOrGalaxyStore } from '~/apis';

describe('POST /kcs/v1/kc/applications Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcUploadAPublicAppFromPlayStoreOrGalaxyStore({
        region: 'US',
        knoxAccessToken: '',
        args: {
          name: '',
          platform: 'ANDROID',
          source: 'GOOGLE_PLAY_STORE',
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
      await kcUploadAPublicAppFromPlayStoreOrGalaxyStore({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          name: '',
          platform: 'ANDROID',
          source: 'GOOGLE_PLAY_STORE',
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

describe('CLASS POST /kcs/v1/kc/applications Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      const instance = new KcInstance({
        knoxAccessToken: '',
        region: 'US',
      });

      await instance.v1.ContentManagementApplication.uploadAPublicAppFromPlayStoreOrGalaxyStore({
        args: {
          name: '',
          platform: 'ANDROID',
          source: 'GOOGLE_PLAY_STORE',
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
      const instance = new KcInstance({
        knoxAccessToken: 'asd',
        region: 'TEST',
      });

      await instance.v1.ContentManagementApplication.uploadAPublicAppFromPlayStoreOrGalaxyStore({
        args: {
          name: '',
          platform: 'ANDROID',
          source: 'GOOGLE_PLAY_STORE',
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
