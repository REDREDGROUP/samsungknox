import { AxiosInstance } from 'axios';
import { GetMediaFile, KCGetMediaFileArgs, KCGetMediaFileResponse } from './get-media-file';
import { BaseArgsInput, BaseResponse } from '~/types';
import {
  UploadMediaFileContentInCms,
  KCUploadMediaFileContentInCmsArgs,
  KCUploadMediaFileContentInCmsResponse,
} from './upload-media-file-content-in-cms';

/**
 * Functions Export
 */
export * from './upload-media-file-content-in-cms';
export * from './get-media-file';

/**
 * Class Export
 */
export class KCContentManagementAsset {
  private axios: AxiosInstance;
  private UploadMediaFileContentInCms: UploadMediaFileContentInCms;
  private GetMediaFile: GetMediaFile;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.UploadMediaFileContentInCms = new UploadMediaFileContentInCms({ axios: this.axios });
    this.GetMediaFile = new GetMediaFile({ axios: this.axios });
  }

  public async getMediaFile({ args }: BaseArgsInput<KCGetMediaFileArgs>): Promise<BaseResponse<KCGetMediaFileResponse>> {
    return this.GetMediaFile.getMediaFile({ args });
  }

  public async uploadMediaFileContentInCms({
    args,
  }: BaseArgsInput<KCUploadMediaFileContentInCmsArgs>): Promise<BaseResponse<KCUploadMediaFileContentInCmsResponse>> {
    return this.UploadMediaFileContentInCms.uploadMediaFileContentInCms({ args });
  }
}
