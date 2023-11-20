import { AxiosInstance } from 'axios';
import { DeleteApplicationVersion, KCDeleteApplicationVersionsArgs } from './delete-application-versions';
import { BaseArgsInput, BaseResponse } from '~/types';
import { GetApplication, KCGetApplicationResponse, KCGetApplicationsArgs } from './get-applications';

/**
 * Functions Export
 */
export * from './get-applications';
export * from './delete-application-versions';

/**
 * Class Export
 */
export class KCContentManagementApplication {
  private axios: AxiosInstance;
  private GetApplication: GetApplication;
  private DeleteApplicationVersion: DeleteApplicationVersion;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.GetApplication = new GetApplication({ axios: this.axios });
    this.DeleteApplicationVersion = new DeleteApplicationVersion({ axios: this.axios });
  }

  public async getApplications({ args }: BaseArgsInput<KCGetApplicationsArgs>): Promise<BaseResponse<KCGetApplicationResponse>> {
    return this.GetApplication.getApplications({ args });
  }

  public async deleteApplicationVersions({ args }: BaseArgsInput<KCDeleteApplicationVersionsArgs>) {
    return this.DeleteApplicationVersion.deleteApplicationVersions({ args });
  }
}
