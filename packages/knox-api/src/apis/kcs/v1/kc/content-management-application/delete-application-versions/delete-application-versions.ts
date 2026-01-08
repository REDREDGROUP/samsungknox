import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { KCDeleteApplicationVersionsResponse, KCDeleteApplicationVersionsArgs } from './delete-application-versions.type';
import { knoxKcsInstance } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcDeleteApplicationVersions = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCDeleteApplicationVersionsArgs>>>,
): Promise<BaseResponse<KCDeleteApplicationVersionsResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class DeleteApplicationVersion {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async deleteApplicationVersions({
    args,
  }: BaseArgsInput<KCDeleteApplicationVersionsArgs>): Promise<BaseResponse<KCDeleteApplicationVersionsResponse>> {
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
  args: KCDeleteApplicationVersionsArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCDeleteApplicationVersionsResponse>> => {
  try {
    const { data } = await axios.delete<KCDeleteApplicationVersionsResponse>(`/kcs/v1/kc/applications/${args.applicationId}`, {
      params: args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        failedCount: data.failedCount,
        notificationId: data.notificationId,
        successCount: data.successCount,
        totalCount: data.totalCount,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
