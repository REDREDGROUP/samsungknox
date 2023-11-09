import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCAssignProfileDeviceArgs, KCAssignProfileDeviceResponse } from './assign-profile.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcAssignProfileDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCAssignProfileDeviceArgs>>>,
): Promise<BaseResponse<KCAssignProfileDeviceResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.put<KCAssignProfileDeviceResponse>('/kcs/v1/kc/devices/assign', {
      ...args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
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
