import { AxiosInstance } from 'axios';
import { BaseArgsInput, BaseResponse } from '~/types';
import { GetKnoxConfigureProfilesArgsType, GetKnoxConfigureProfilesResponseType, GetProfile } from './get-profiles';
import { GetProfileDetails } from './get-profile-details';
import { KCGetProfileDetailsArgs, KCGetProfileDetailsResponse } from './get-profile-details';
import { DeleteProfile, KCDeleteProfileArgs, KCDeleteProfileResponse } from './delete-profile';

/**
 * Functions Export
 */
export * from './get-profiles';
export * from './get-profile-details';
export * from './delete-profile';

/**
 * Class Export
 */
export class KCProfile {
  private axios: AxiosInstance;
  private GetProfile: GetProfile;
  private GetProfileDetails: GetProfileDetails;
  private DeleteProfile: DeleteProfile;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.GetProfile = new GetProfile({ axios: this.axios });
    this.GetProfileDetails = new GetProfileDetails({ axios: this.axios });
    this.DeleteProfile = new DeleteProfile({ axios: this.axios });
  }

  public async getProfiles({ args }: BaseArgsInput<GetKnoxConfigureProfilesArgsType>): Promise<BaseResponse<GetKnoxConfigureProfilesResponseType>> {
    return this.GetProfile.getProfiles({ args });
  }

  public async getProfileDetails({ args }: BaseArgsInput<KCGetProfileDetailsArgs>): Promise<BaseResponse<KCGetProfileDetailsResponse>> {
    return this.GetProfileDetails.getProfileDetails({ args });
  }

  public async deleteProfile({ args }: BaseArgsInput<KCDeleteProfileArgs>): Promise<BaseResponse<KCDeleteProfileResponse>> {
    return this.DeleteProfile.deleteProfile({ args });
  }
}
