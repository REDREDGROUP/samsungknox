import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCUnassignProfileDevicesArgs, KCUnassignProfileDevicesResponse } from './unassign-profile.type';
import { knoxKcsInstance } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcUnassignProfileDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUnassignProfileDevicesArgs>>>,
): Promise<BaseResponse<KCUnassignProfileDevicesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class UnassignProfileDevices {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async unassignProfileDevices({
    args,
  }: BaseArgsInput<KCUnassignProfileDevicesArgs>): Promise<BaseResponse<KCUnassignProfileDevicesResponse>> {
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
  args: KCUnassignProfileDevicesArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCUnassignProfileDevicesResponse>> => {
  try {
    const { data } = await axios.put<KCUnassignProfileDevicesResponse>('/kcs/v1/kc/devices/unassign', {
      ...args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        failedCount: data.failedCount,
        pendingCount: data.pendingCount,
        successCount: data.successCount,
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
