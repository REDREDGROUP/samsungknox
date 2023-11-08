import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCSendCommandToMultipleDeviceArgs, KCSendCommandToMultipleDeviceResponse } from './send-command-to-multiple-devices.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcSendCommandToMultipleDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCSendCommandToMultipleDeviceArgs>>>,
): Promise<BaseResponse<KCSendCommandToMultipleDeviceResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.put<KCSendCommandToMultipleDeviceResponse>('/kcs/v1/kc/devices/command', {
      ...args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
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
