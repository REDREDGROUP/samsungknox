import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCUnassignProfileDevicesArgs, KCUnassignProfileDevicesResponse } from './unassign-profile.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcUnassignProfileDevices = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUnassignProfileDevicesArgs>>>,
): Promise<BaseResponse<KCUnassignProfileDevicesResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.put<KCUnassignProfileDevicesResponse>('/kcs/v1/kc/devices/unassign', {
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
