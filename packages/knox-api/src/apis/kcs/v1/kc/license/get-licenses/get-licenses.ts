import { KnoxRequestError } from '~/errors';
import { knoxDefaultAxios } from '~/utils';
import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCLicensesArgs, KCLicensesResponse } from './get-licenses.type';

export const kcGetLicenses = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCLicensesArgs>>>,
): Promise<BaseResponse<KCLicensesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<KCLicensesResponse>('/kcs/v1/kc/licenses', {
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
    } else {
      throw new Error(error);
    }
  }
};
