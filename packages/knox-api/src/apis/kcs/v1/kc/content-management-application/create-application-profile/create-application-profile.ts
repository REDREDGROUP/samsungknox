import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput } from '~/types';
import { KCCreateApplicationProfileArgs } from './create-application-profile.type';
import { knoxDefaultAxios } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcCreateApplicationProfile = async (value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCCreateApplicationProfileArgs>>>) => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

const request = async ({ args, axios }: { args: KCCreateApplicationProfileArgs; axios: AxiosInstance }) => {
  try {
    const { data } = await axios.get('/kcs/v1/kc/applications', {
      params: args,
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
