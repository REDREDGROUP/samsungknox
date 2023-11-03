import { knoxDefaultAxios } from '~/utils';
import { BaseApiRequireArgs, BaseResponse } from '~/types';
import { KnoxRequestError } from '~/errors';
import { AccessTokenArgs, AccessTokenResponse } from './access-token.type';

export const requestAccessToken = async ({
  base64EncodedStringPublicKey,
  clientIdentifierJwt,
  validityForAccessTokenInMinutes,
  region,
}: BaseApiRequireArgs<AccessTokenArgs>): Promise<BaseResponse<AccessTokenResponse>> => {
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.post<AccessTokenResponse>('/ams/v1/users/accesstoken', {
      ...(validityForAccessTokenInMinutes && {
        validityForAccessTokenInMinutes,
      }),
      base64EncodedStringPublicKey,
      clientIdentifierJwt,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        accessToken: data.accessToken,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
