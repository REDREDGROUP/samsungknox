import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import {
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs,
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse,
} from './upload-a-public-app-from-playstore-or-galaxystore.type';
import { knoxKcsInstance } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcUploadAPublicAppFromPlayStoreOrGalaxyStore = (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs>>>,
): Promise<BaseResponse<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
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
