import { BaseXApiRequire, BaseApiRequireArgs, BaseArgsInput, BaseResponse } from '~/types';
import { KCUploadMediaFileContentInCmsArgs, KCUploadMediaFileContentInCmsResponse } from './upload-media-file-content-in-cms.type';
import { knoxKcsInstance } from '~/utils';
import { AxiosInstance } from 'axios';
import { KnoxRequestError } from '~/errors';

export const kcUploadMediaFileContentInCms = async (
  value: BaseXApiRequire<BaseApiRequireArgs<BaseArgsInput<KCUploadMediaFileContentInCmsArgs>>>,
): Promise<BaseResponse<KCUploadMediaFileContentInCmsResponse>> => {
  const { region, knoxAccessToken, args } = value;
  const axios = knoxKcsInstance({ region, knoxAccessToken });
  return request({ args, axios });
};

export class UploadMediaFileContentInCms {
  private axios: AxiosInstance;

  constructor({ axios }: { axios: AxiosInstance }) {
    this.axios = axios;
  }

  public async uploadMediaFileContentInCms({
    args,
  }: BaseArgsInput<KCUploadMediaFileContentInCmsArgs>): Promise<BaseResponse<KCUploadMediaFileContentInCmsResponse>> {
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
  args: KCUploadMediaFileContentInCmsArgs;
  axios: AxiosInstance;
}): Promise<BaseResponse<KCUploadMediaFileContentInCmsResponse>> => {
  try {
    const { data } = await axios.post<KCUploadMediaFileContentInCmsResponse>(`/kcs/v1/kc/assets`, args);

    return {
      status: 'SUCCESS',
      message: null,
      result: {
        code: data.code,
        contentId: data.contentId,
        contentSize: data.contentSize,
        fileName: data.fileName,
        href: data.href,
        message: data.message,
      },
    };
  } catch (error: any) {
    if (error instanceof KnoxRequestError) {
      throw new KnoxRequestError(error.code, error.message, error.data);
    }
    throw new Error(error);
  }
};
