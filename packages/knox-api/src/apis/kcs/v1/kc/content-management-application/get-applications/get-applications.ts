import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetApplicationResponse, KCGetApplicationsArgs } from './get-applications.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcGetApplications = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetApplicationsArgs>>>,
): Promise<BaseResponse<KCGetApplicationResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetApplication {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getApplications({ args }: BaseArgsInput<KCGetApplicationsArgs>): Promise<BaseResponse<KCGetApplicationResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCGetApplicationsArgs; axios: AxiosInstance }): Promise<BaseResponse<KCGetApplicationResponse>> => {
  try {
    const { data } = await axios.get<KCGetApplicationResponse>('/kcs/v1/kc/applications', {
      params: args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        applications: data.applications,
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
