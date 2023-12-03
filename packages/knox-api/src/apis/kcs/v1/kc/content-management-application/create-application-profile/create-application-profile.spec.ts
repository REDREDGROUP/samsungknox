import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';
import { kcCreateApplicationProfile } from './create-application-profile';
import { KcInstance } from '~/apis';

describe('POST /kcs/v1/kc/applications/profile Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcCreateApplicationProfile({
        region: 'US',
        knoxAccessToken: '',
        args: {
          additionalEula: {
            termsAndConditions: '',
            title: '',
          },
          name: '',
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
      await kcCreateApplicationProfile({
        region: '',
        knoxAccessToken: '',
        args: {
          additionalEula: {
            termsAndConditions: '',
            title: '',
          },
          name: '',
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
      const instance = new KcInstance({
        knoxAccessToken: '',
        region: 'US',
      });

      await instance.v1.ContentManagementApplication.createApplicationProfile({
        args: {
          additionalEula: {
            termsAndConditions: '',
            title: '',
          },
          name: '',
        },
      });
    } catch (error) {
      console.log(error);
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
        knoxAccessToken: '',
        region: 'TEST',
      });

      await instance.v1.ContentManagementApplication.createApplicationProfile({
        args: {
          additionalEula: {
            termsAndConditions: '',
            title: '',
          },
          name: '',
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
