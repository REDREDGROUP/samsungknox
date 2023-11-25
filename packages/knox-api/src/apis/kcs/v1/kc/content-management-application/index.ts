import { AxiosInstance } from 'axios';
import { DeleteApplicationVersion, KCDeleteApplicationVersionsArgs } from './delete-application-versions';
import { BaseArgsInput, BaseResponse } from '~/types';
import { GetApplication, KCGetApplicationResponse, KCGetApplicationsArgs } from './get-applications';
import { CreateApplicationProfile } from './create-application-profile';
import { KCCreateApplicationProfileArgs, KCCreateApplicationProfileResponse } from './create-application-profile/create-application-profile.type';

/**
 * Functions Export
 */
export * from './create-application-profile';
export * from './get-applications';
export * from './delete-application-versions';

/**
 * Class Export
 */
export class KCContentManagementApplication {
  private axios: AxiosInstance;
  private GetApplication: GetApplication;
  private DeleteApplicationVersion: DeleteApplicationVersion;
  private CreateApplicationProfile: CreateApplicationProfile;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.CreateApplicationProfile = new CreateApplicationProfile({ axios: this.axios });
    this.GetApplication = new GetApplication({ axios: this.axios });
    this.DeleteApplicationVersion = new DeleteApplicationVersion({ axios: this.axios });
  }

  public async createApplicationProfile({
    args,
  }: BaseArgsInput<KCCreateApplicationProfileArgs>): Promise<BaseResponse<KCCreateApplicationProfileResponse>> {
    return this.CreateApplicationProfile.createApplicationProfile({ args });
  }

  public async getApplications({ args }: BaseArgsInput<KCGetApplicationsArgs>): Promise<BaseResponse<KCGetApplicationResponse>> {
    return this.GetApplication.getApplications({ args });
  }

  public async deleteApplicationVersions({ args }: BaseArgsInput<KCDeleteApplicationVersionsArgs>) {
    return this.DeleteApplicationVersion.deleteApplicationVersions({ args });
  }
}
