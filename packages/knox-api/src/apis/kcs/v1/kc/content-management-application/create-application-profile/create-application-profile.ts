import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCCreateApplicationProfileArgs, KCCreateApplicationProfileResponse } from './create-application-profile.type';
import { knoxKcsInstance } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcCreateApplicationProfile = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCCreateApplicationProfileArgs>>>,
): Promise<BaseResponse<KCCreateApplicationProfileResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class CreateApplicationProfile {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async createApplicationProfile({
    args,
  }: BaseArgsInput<KCCreateApplicationProfileArgs>): Promise<BaseResponse<KCCreateApplicationProfileResponse>> {
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
  args: KCCreateApplicationProfileArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCCreateApplicationProfileResponse>> => {
  try {
    const { data } = await axios.post<KCCreateApplicationProfileResponse>('/kcs/v1/kc/applications/profile', args);

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        createTime: data.createTime,
        creator: data.creator,
        modifier: data.modifier,
        name: data.name,
        profileId: data.profileId,
        updateTime: data.updateTime,
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
