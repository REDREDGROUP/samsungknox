import { BaseApiRequireArgs, BaseArgsInput, BaseXApiRequire, BaseKCLicense, BaseResponse } from '~/types';
import { KCValidateLicenseArgs } from './validate-license.type';
import { knoxKcsInstance } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcValidateLicense = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCValidateLicenseArgs>>>,
): Promise<BaseResponse<BaseKCLicense>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class ValidateLicense {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async validateLicense({ args }: BaseArgsInput<KCValidateLicenseArgs>): Promise<BaseResponse<BaseKCLicense>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCValidateLicenseArgs; axios: AxiosInstance }): Promise<BaseResponse<BaseKCLicense>> => {
  try {
    const { data } = await axios.post<BaseKCLicense>('/kcs/v1/kc/licenses/validation', args, {});

    return {
      status: 'SUCCESS',
      message: data.statusMessage,
      result: {
        licenses: data.licenses,
        totalCount: data.totalCount,
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    } else {
      throw new Error(error);
    }
  }
};
