import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetApplicationResponse, KCGetApplicationsArgs } from './get-applications.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcGetApplications = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetApplicationsArgs>>>,
): Promise<BaseResponse<KCGetApplicationResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.get<KCGetApplicationResponse>('/kcs/v1/kc/applications', {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        applications: data.applications,
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
