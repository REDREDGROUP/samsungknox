import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetDeviceLogsArgs, KCGetDeviceLogsResponse } from './get-device-logs.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcGetDeviceLogs = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetDeviceLogsArgs>>>,
): Promise<BaseResponse<KCGetDeviceLogsResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetDeviceLog {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async GetDeviceLogs({ args }: BaseArgsInput<KCGetDeviceLogsArgs>): Promise<BaseResponse<KCGetDeviceLogsResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCGetDeviceLogsArgs; axios: AxiosInstance }): Promise<BaseResponse<KCGetDeviceLogsResponse>> => {
  try {
    const { data } = await axios.get<KCGetDeviceLogsResponse>(`/kcs/v1/kc/devices/${args.deviceId}/logs`, {
      params: args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        deviceId: data.deviceId,
        deviceLogs: data.deviceLogs,
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
