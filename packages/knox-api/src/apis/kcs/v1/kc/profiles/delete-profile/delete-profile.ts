import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCDeleteProfileArgs, KCDeleteProfileResponse } from './delete-profile.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcDeleteProfile = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCDeleteProfileArgs>>>,
): Promise<BaseResponse<KCDeleteProfileResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.delete<KCDeleteProfileResponse>('/kcs/v1/kc/profiles', {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: data.message,
      result: {
        code: data.code,
        data: data.data,
        message: data.message,
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
