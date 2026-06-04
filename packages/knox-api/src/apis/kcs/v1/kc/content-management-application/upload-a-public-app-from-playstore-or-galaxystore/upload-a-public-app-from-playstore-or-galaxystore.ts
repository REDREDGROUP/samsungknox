import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';
import { BaseApiRequireArgs, BaseArgsInput, BaseResponse, BaseXApiRequire } from '~/types';
import { knoxDefaultAxios } from '~/utils';
import {
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs,
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse,
} from './upload-a-public-app-from-playstore-or-galaxystore.type';

export const kcUploadAPublicAppFromPlayStoreOrGalaxyStore = (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs>>>,
): Promise<BaseResponse<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxDefaultAxios({ region, knoxAccessToken });
  return request({ args, axios });
};

export class UploadAPublicAppFromPlayStoreOrGalaxyStore {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async uploadAPublicAppFromPlayStoreOrGalaxyStore({
    args,
  }: BaseArgsInput<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs>): Promise<BaseResponse<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>> {
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
  args: KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>> => {
  try {
    const { data } = await axios.post<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>(`/kcs/v1/kc/applications`, args);

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        appName: data.appName,
        errorResponse: data.errorResponse,
        newVersion: data.newVersion,
        successResponse: data.successResponse,
        version: data.version,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
