import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseKCLicense } from '~/types';
import { KCRegisterLicenseArgs } from './register-license.type';
import { knoxKcsInstance } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcRegisterLicense = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCRegisterLicenseArgs>>>,
): Promise<BaseResponse<BaseKCLicense>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class RegisterLicense {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async registerLicense({ args }: BaseArgsInput<KCRegisterLicenseArgs>): Promise<BaseResponse<BaseKCLicense>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCRegisterLicenseArgs; axios: AxiosInstance }): Promise<BaseResponse<BaseKCLicense>> => {
  try {
    const { data } = await axios.post<BaseKCLicense>('/kcs/v1/kc/licenses', args);

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
    }
    throw new Error(error);
  }
};
