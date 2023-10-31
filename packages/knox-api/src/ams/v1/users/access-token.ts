import { knoxDefaultAxios } from '../../../knox-axios';
import { BaseApiHeaderType, BaseResponseType } from '../../../../types';

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
}: BaseApiHeaderType<AccessTokenArgsType>): Promise<BaseResponseType<AccessTokenResponseType>> => {
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
  } catch (e: any) {
    throw new Error(e);
  }
};
