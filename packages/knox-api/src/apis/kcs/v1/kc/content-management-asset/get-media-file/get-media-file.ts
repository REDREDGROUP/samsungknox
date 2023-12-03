import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCGetMediaFileArgs, KCGetMediaFileResponse } from './get-media-file.type';
import { knoxKcsInstance } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcGetMediaFile = (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCGetMediaFileArgs>>>,
): Promise<BaseResponse<KCGetMediaFileResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class GetMediaFile {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async getMediaFile({ args }: BaseArgsInput<KCGetMediaFileArgs>): Promise<BaseResponse<KCGetMediaFileResponse>> {
    return request({
      args: args,
      axios: this.axios,
    });
  }
}

const request = async ({ args, axios }: { args: KCGetMediaFileArgs; axios: AxiosInstance }): Promise<BaseResponse<KCGetMediaFileResponse>> => {
  try {
    const { data } = await axios.get(`/kcs/v1/kc/assets/${args.contentId}`, { params: args });

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        downloadUrl: data,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
