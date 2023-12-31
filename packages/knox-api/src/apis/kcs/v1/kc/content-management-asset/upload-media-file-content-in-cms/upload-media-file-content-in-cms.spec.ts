import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';
import { KnoxInstance, kcUploadMediaFileContentInCms } from '~/apis';

describe('POST /kcs/v1/kc/assets Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcUploadMediaFileContentInCms({
        region: 'US',
        knoxAccessToken: '',
        args: {
          file: '',
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
      await kcUploadMediaFileContentInCms({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          file: '',
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

describe('CLASS POST /kcs/v1/kc/assets Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      const instance = new KnoxInstance({
        knoxAccessToken: '',
        region: 'US',
      });

      await instance.kcContentManagementAsset.uploadMediaFileContentInCms({
        args: {
          file: '',
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

      await instance.kcContentManagementAsset.uploadMediaFileContentInCms({
        args: {
          file: '',
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
