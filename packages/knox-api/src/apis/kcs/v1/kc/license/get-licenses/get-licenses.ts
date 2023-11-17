import { KnoxRequestError } from '~/errors';
import { knoxDefaultAxios } from '~/utils';
import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCLicensesArgs, KCLicensesResponse } from './get-licenses.type';
import { AxiosInstance } from 'axios';

export const kcGetLicenses = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCLicensesArgs>>>,
): Promise<BaseResponse<KCLicensesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxApiToken: knoxAccessToken });
  return request({ args, axios });
};

export class GetLicense {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getLicenses({ args }: BaseArgsInput<KCLicensesArgs>): Promise<BaseResponse<KCLicensesResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCLicensesArgs; axios: AxiosInstance }): Promise<BaseResponse<KCLicensesResponse>> => {
  try {
    const { data } = await axios.get<KCLicensesResponse>('/kcs/v1/kc/licenses', {
      params: args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        licenses: data.licenses,
        totalCount: data.totalCount,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
