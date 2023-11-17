import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetDevicesArgs, KCGetDevicesResponse } from './get-devices.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';
import { AxiosInstance } from 'axios';

export const kcGetDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetDevicesArgs>>>,
): Promise<BaseResponse<KCGetDevicesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxApiToken: knoxAccessToken });
  return request({ args, axios });
};

export class GetDevice {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getDevices({ args }: BaseArgsInput<KCGetDevicesArgs>): Promise<BaseResponse<KCGetDevicesResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCGetDevicesArgs; axios: AxiosInstance }): Promise<BaseResponse<KCGetDevicesResponse>> => {
  try {
    const { data } = await axios.get<KCGetDevicesResponse>('/kcs/v1/kc/devices', {
      params: args,
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        deviceList: data.deviceList,
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
