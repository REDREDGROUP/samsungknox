import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCDeleteProfileArgs, KCDeleteProfileResponse } from './delete-profile.type';
import { knoxKcsInstance } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcDeleteProfile = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCDeleteProfileArgs>>>,
): Promise<BaseResponse<KCDeleteProfileResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class DeleteProfile {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async deleteProfile({ args }: BaseArgsInput<KCDeleteProfileArgs>): Promise<BaseResponse<KCDeleteProfileResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCDeleteProfileArgs; axios: AxiosInstance }): Promise<BaseResponse<KCDeleteProfileResponse>> => {
  try {
    const { data } = await axios.delete<KCDeleteProfileResponse>('/kcs/v1/kc/profiles', {
      params: args,
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
