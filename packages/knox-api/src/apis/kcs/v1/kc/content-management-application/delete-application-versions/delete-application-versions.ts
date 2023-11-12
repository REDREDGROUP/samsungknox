import { BaseApiRequireArgs, BaseArgsInput, BaseXApiRequire } from '~/types';
import { KCDeleteApplicationVersionsResponse, KCDeleteApplicationVersionsArgs } from './delete-application-versions.type';
import { knoxDefaultAxios } from '~/utils';
import { KnoxRequestError } from '~/errors';

export const kcDeleteApplicationVersions = async (value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCDeleteApplicationVersionsArgs>>>) => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region });

  try {
    const { data } = await axios.delete<KCDeleteApplicationVersionsResponse>(`/kcs/v1/kc/applications/${args.applicationId}`, {
      params: args,
      headers: {
        'X-KNOX-APITOKEN': knoxAccessToken,
      },
    });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        failedCount: data.failedCount,
        notificationId: data.notificationId,
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
