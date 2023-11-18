import { KnoxRequestError } from '~/errors';
import { knoxDefaultAxios } from '~/utils';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { GetKnoxConfigureProfilesResponseType, GetKnoxConfigureProfilesArgsType } from './get-profiles.type';
import { AxiosInstance } from 'axios';

export const kcGetProfiles = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<GetKnoxConfigureProfilesArgsType>>>,
): Promise<BaseResponse<GetKnoxConfigureProfilesResponseType>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetProfile {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getProfiles({ args }: BaseArgsInput<GetKnoxConfigureProfilesArgsType>): Promise<BaseResponse<GetKnoxConfigureProfilesResponseType>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({
  args,
  axios,
}: {
  args: GetKnoxConfigureProfilesArgsType;
  axios: AxiosInstance;
}): Promise<BaseResponse<GetKnoxConfigureProfilesResponseType>> => {
  try {
    const { data } = await axios.get<GetKnoxConfigureProfilesResponseType>('/kcs/v1/kc/profiles', {
      params: args,
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
