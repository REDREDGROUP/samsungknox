import { knoxDefaultAxios } from '~/utils';
import { BaseApiRequireArgsType, BaseResponseType } from '~/types';
import { KnoxRequestError } from '~/errors';

export type AccessTokenArgsType = {
  base64EncodedStringPublicKey: string;
  clientIdentifierJwt: string;
  validityForAccessTokenInMinutes: number;
};

export type AccessTokenResponseType = {
  accessToken: string;
};

export const requestAccessToken = async ({
  base64EncodedStringPublicKey,
  clientIdentifierJwt,
  validityForAccessTokenInMinutes,
  region,
}: BaseApiRequireArgsType<AccessTokenArgsType>): Promise<BaseResponseType<AccessTokenResponseType>> => {
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.post<AccessTokenResponseType>('/ams/v1/users/accesstoken', {
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
    } else {
      throw new Error(error);
    }
  }
};
