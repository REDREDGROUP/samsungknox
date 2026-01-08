import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCUploadAnInHouseAppArgs, KCUploadAnInHouseAppResponse } from './upload-an-in-house-app.type';
import { knoxKcsInstance } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcUploadAnInHouseApp = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUploadAnInHouseAppArgs>>>,
): Promise<BaseResponse<KCUploadAnInHouseAppResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({
    region,
    knoxAccessToken,
    customHeader: {
      'content-type': 'multipart/form-data',
    },
  });
  return request({ args, axios });
};

export class UploadAnInHouseApp {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async uploadAnInHouseApp({ args }: BaseArgsInput<KCUploadAnInHouseAppArgs>): Promise<BaseResponse<KCUploadAnInHouseAppResponse>> {
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
  args: KCUploadAnInHouseAppArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCUploadAnInHouseAppResponse>> => {
  try {
    const { data } = await axios.post<KCUploadAnInHouseAppResponse>(`/kcs/v1/kc/applications/upload`, args);

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
