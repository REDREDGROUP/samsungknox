import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetDevicesArgs, KCGetDevicesResponse } from './get-devices.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcGetDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetDevicesArgs>>>,
): Promise<BaseResponse<KCGetDevicesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<KCGetDevicesResponse>('/kcs/v1/kc/devices', {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
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