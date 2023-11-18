import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetProfileDetailsArgs, KCGetProfileDetailsResponse } from './get-profile-details.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcGetProfileDetails = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetProfileDetailsArgs>>>,
): Promise<BaseResponse<KCGetProfileDetailsResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetProfileDetails {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getProfileDetails({ args }: BaseArgsInput<KCGetProfileDetailsArgs>): Promise<BaseResponse<KCGetProfileDetailsResponse>> {
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
  args: KCGetProfileDetailsArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCGetProfileDetailsResponse>> => {
  try {
    const { data } = await axios.get<KCGetProfileDetailsResponse>(`/kcs/v1/kc/profiles/${args.profileId}/details`, {});

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
