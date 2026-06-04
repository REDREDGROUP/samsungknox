import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { knoxDefaultAxios } from '~/utils';
import { KCDeleteDevicesArgs, KCDeleteDevicesResponse } from './delete-devices.type';

export const kcDeleteDevices = async (value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCDeleteDevicesArgs>>>): Promise<BaseResponse<KCDeleteDevicesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class DeleteDevice {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async deleteDevice({ args }: BaseArgsInput<KCDeleteDevicesArgs>): Promise<BaseResponse<KCDeleteDevicesResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCDeleteDevicesArgs; axios: AxiosInstance }): Promise<BaseResponse<KCDeleteDevicesResponse>> => {
  try {
    const { data } = await axios.delete<KCDeleteDevicesResponse>('/kcs/v1/kc/devices', {
      params: args,
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
    }
    throw new Error(error);
  }
};
