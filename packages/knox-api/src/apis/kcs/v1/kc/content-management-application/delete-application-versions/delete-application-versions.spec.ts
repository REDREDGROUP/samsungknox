import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';
import { kcDeleteApplicationVersions } from './delete-application-versions';
import { KnoxInstance } from '~/apis';

describe('DELETE /kcs/v1/kc/applications/{applicationId} Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcDeleteApplicationVersions({
        region: 'US',
        knoxAccessToken: '',
        args: {
          applicationId: 'TEST_APP',
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
      await kcDeleteApplicationVersions({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          applicationId: 'TEST_APP',
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

describe('CLASS POST /kcs/v1/kc/applications/profile Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      const instance = new KnoxInstance({
        knoxAccessToken: '',
        region: 'US',
      });

      await instance.kcContentManagementApplication.deleteApplicationVersions({
        args: {
          applicationId: 'TEST_APP',
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

      await instance.kcContentManagementApplication.deleteApplicationVersions({
        args: {
          applicationId: 'TEST_APP',
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
