import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { KCLicenseDetailArgs, KCLicensesDetailResponse } from './get-license-detail-by-license-id.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcGetLicenseDetailByLicenseId = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCLicenseDetailArgs>>>,
): Promise<BaseResponse<KCLicensesDetailResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetLicenseDetail {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async GetLicenseDetailByLicenseId({ args }: BaseArgsInput<KCLicenseDetailArgs>): Promise<BaseResponse<KCLicensesDetailResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCLicenseDetailArgs; axios: AxiosInstance }): Promise<BaseResponse<KCLicensesDetailResponse>> => {
  try {
    const { data } = await axios.get<KCLicensesDetailResponse>('/kcs/v1/kc/licenses', {
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
