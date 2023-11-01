import { KnoxRequestError } from '../../../../../knox-axios.error';
import { knoxDefaultAxios } from '../../../../../knox-axios';
import { BaseApiRequireArgsType, BaseArgsInputType, BaseResponseType, BaseXApiRequireType } from '../../../../../../types';
import { GetKcsProfilesResponseType, GetKcsProfilesArgsType } from './get-profiles.type';

export const getKcsProfiles = async (
  value: BaseXApiRequireType<BaseApiRequireArgsType<BaseArgsInputType<GetKcsProfilesArgsType>>>,
): Promise<BaseResponseType<GetKcsProfilesResponseType>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });
  try {
    const { data } = await axios.get<GetKcsProfilesResponseType>('/kcs/v1/kc/profiles', {
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
