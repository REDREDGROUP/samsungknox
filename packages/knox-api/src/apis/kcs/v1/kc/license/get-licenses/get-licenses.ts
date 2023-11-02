import { KnoxRequestError } from '~/errors';
import { knoxDefaultAxios } from '~/utils';
import { BaseXApiRequireType, BaseApiRequireArgsType, BaseArgsInputType, BaseResponseType } from '~/types';
import { GetKnoxConfigureLicensesArgsType, GetKnoxConfigureLicensesResponseType } from './get-licenses.type';

export const getKnoxConfigureLicenses = async (
  value: BaseXApiRequireType<BaseApiRequireArgsType<BaseArgsInputType<GetKnoxConfigureLicensesArgsType>>>,
): Promise<BaseResponseType<GetKnoxConfigureLicensesResponseType>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<GetKnoxConfigureLicensesResponseType>('/kcs/v1/kc/licenses', {
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
