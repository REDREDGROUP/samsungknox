import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { KCLicenseDetailArgs, KCLicensesDetailResponse } from './get-license-detail-by-license-id.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcGetLicenseDetailByLicenseId = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCLicenseDetailArgs>>>,
): Promise<BaseResponse<KCLicensesDetailResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<KCLicensesDetailResponse>('/kcs/v1/kc/licenses', {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
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
