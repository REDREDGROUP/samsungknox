import { KnoxRequestError } from '~/errors';
import { knoxDefaultAxios } from '~/utils';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { GetKnoxConfigureProfilesResponseType, GetKnoxConfigureProfilesArgsType } from './get-profiles.type';

export const kcGetProfiles = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<GetKnoxConfigureProfilesArgsType>>>,
): Promise<BaseResponse<GetKnoxConfigureProfilesResponseType>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });
  try {
    const { data } = await axios.get<GetKnoxConfigureProfilesResponseType>('/kcs/v1/kc/profiles', {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        contents: data.contents,
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
