import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { knoxDefaultAxios } from '~/utils';
import { KCAssignProfileDeviceArgs, KCAssignProfileDeviceResponse } from './assign-profile.type';

export const kcAssignProfileDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCAssignProfileDeviceArgs>>>,
): Promise<BaseResponse<KCAssignProfileDeviceResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class AssignProfileDevice {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async assignProfileDevices({ args }: BaseArgsInput<KCAssignProfileDeviceArgs>): Promise<BaseResponse<KCAssignProfileDeviceResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCAssignProfileDeviceArgs; axios: AxiosInstance }): Promise<BaseResponse<KCAssignProfileDeviceResponse>> => {
  try {
    const { data } = await axios.put<KCAssignProfileDeviceResponse>('/kcs/v1/kc/devices/assign', {
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
