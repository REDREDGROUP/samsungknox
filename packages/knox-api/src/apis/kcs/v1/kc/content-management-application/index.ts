import { AxiosInstance } from 'axios';
import { DeleteApplicationVersion, KCDeleteApplicationVersionsArgs } from './delete-application-versions';
import { BaseArgsInput, BaseResponse } from '~/types';
import { GetApplication, KCGetApplicationResponse, KCGetApplicationsArgs } from './get-applications';
import { CreateApplicationProfile, KCCreateApplicationProfileArgs, KCCreateApplicationProfileResponse } from './create-application-profile';
import {
  UploadAPublicAppFromPlayStoreOrGalaxyStore,
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs,
  KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse,
} from './upload-a-public-app-from-playstore-or-galaxystore';
import { KCUploadAnInHouseAppArgs, KCUploadAnInHouseAppResponse, UploadAnInHouseApp } from './upload-an-in-house-app';

/**
 * Functions Export
 */
export * from './create-application-profile';
export * from './upload-a-public-app-from-playstore-or-galaxystore';
export * from './upload-an-in-house-app';
export * from './get-applications';
export * from './delete-application-versions';

/**
 * Class Export
 */
export class KCContentManagementApplication {
  private axios: AxiosInstance;
  private CreateApplicationProfile: CreateApplicationProfile;
  private GetApplication: GetApplication;
  private UploadAPublicAppFromPlayStoreOrGalaxyStore: UploadAPublicAppFromPlayStoreOrGalaxyStore;
  private UploadAnInHouseApp: UploadAnInHouseApp;
  private DeleteApplicationVersion: DeleteApplicationVersion;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.CreateApplicationProfile = new CreateApplicationProfile({ axios: this.axios });
    this.GetApplication = new GetApplication({ axios: this.axios });
    this.UploadAPublicAppFromPlayStoreOrGalaxyStore = new UploadAPublicAppFromPlayStoreOrGalaxyStore({ axios: this.axios });
    this.UploadAnInHouseApp = new UploadAnInHouseApp({ axios: this.axios });
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

  public async uploadAPublicAppFromPlayStoreOrGalaxyStore({
    args,
  }: BaseArgsInput<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs>): Promise<BaseResponse<KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse>> {
    return this.UploadAPublicAppFromPlayStoreOrGalaxyStore.uploadAPublicAppFromPlayStoreOrGalaxyStore({ args });
  }

  public async uploadAnInHouseApp({ args }: BaseArgsInput<KCUploadAnInHouseAppArgs>): Promise<BaseResponse<KCUploadAnInHouseAppResponse>> {
    return this.UploadAnInHouseApp.uploadAnInHouseApp({ args });
  }

  public async deleteApplicationVersions({ args }: BaseArgsInput<KCDeleteApplicationVersionsArgs>) {
    return this.DeleteApplicationVersion.deleteApplicationVersions({ args });
  }
}
