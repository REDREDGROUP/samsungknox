import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { knoxDefaultAxios } from '~/utils';
import { KCSendCommandToMultipleDeviceArgs, KCSendCommandToMultipleDeviceResponse } from './send-command-to-multiple-devices.type';

export const kcSendCommandToMultipleDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCSendCommandToMultipleDeviceArgs>>>,
): Promise<BaseResponse<KCSendCommandToMultipleDeviceResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class SendCommandToMultipleDevices {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async sendCommandToMultipleDevices({ args }: BaseArgsInput<KCSendCommandToMultipleDeviceArgs>): Promise<BaseResponse<KCSendCommandToMultipleDeviceResponse>> {
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
  args: KCSendCommandToMultipleDeviceArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCSendCommandToMultipleDeviceResponse>> => {
  try {
    const { data } = await axios.put<KCSendCommandToMultipleDeviceResponse>('/kcs/v1/kc/devices/command', {
      ...args,
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
