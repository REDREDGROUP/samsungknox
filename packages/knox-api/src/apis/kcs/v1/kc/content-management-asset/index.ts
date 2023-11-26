import { AxiosInstance } from 'axios';
import { GetMediaFile, KCGetMediaFileArgs, KCGetMediaFileResponse } from './get-media-file';
import { BaseArgsInput, BaseResponse } from '~/types';

/**
 * Functions Export
 */
export * from './get-media-file';

/**
 * Class Export
 */
export class KCContentManagementAsset {
  private axios: AxiosInstance;
  private GetMediaFile: GetMediaFile;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.GetMediaFile = new GetMediaFile({ axios: this.axios });
  }

  public async getMediaFile({ args }: BaseArgsInput<KCGetMediaFileArgs>): Promise<BaseResponse<KCGetMediaFileResponse>> {
    return this.GetMediaFile.getMediaFile({ args });
  }
}
