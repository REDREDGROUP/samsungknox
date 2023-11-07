import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetProfileDetailsArgs, KCGetProfileDetailsResponse } from './get-profile-details.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcGetProfileDetails = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetProfileDetailsArgs>>>,
): Promise<BaseResponse<KCGetProfileDetailsResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<KCGetProfileDetailsResponse>(`/kcs/v1/kc/profiles/${args.profileId}/details`, {
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: data,
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    } else {
      throw new Error(error);
    }
  }
};
