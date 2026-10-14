import type { AxiosInstance } from 'axios';
import type { CommonResponse, ProfileId } from './device/types';
import type { GetProfileDetailsResponse } from './profiles/details';
import type {
  BulkAssignRequest,
  BulkPushRequest,
  BulkUnassignRequest,
  CreateCustomPushNotificationRequest,
  CreateCustomPushNotificationResponse,
  CreateProfileRequest,
  CreateProfileResponse,
  GetCustomPushNotificationsResponse,
  GetProfilesRequest,
  GetProfilesResponse,
} from './profiles/types';

export type * from './profiles/configuration';
export type * from './profiles/details';
export type * from './profiles/types';

export function createProfileApi(axios: AxiosInstance) {
  return {
    async getProfiles(args: GetProfilesRequest = {}): Promise<GetProfilesResponse> {
      const { data } = await axios.get<GetProfilesResponse>('/kc/v2/profiles', { params: args, paramsSerializer: { indexes: null } });
      return data;
    },
    async getProfileDetails(profileId: ProfileId): Promise<GetProfileDetailsResponse> {
      const { data } = await axios.get<GetProfileDetailsResponse>(`/kc/v2/profiles/${encodeURIComponent(profileId)}`);
      return data;
    },
    async createProfile(args: CreateProfileRequest): Promise<CreateProfileResponse> {
      const { data } = await axios.post<CreateProfileResponse>('/kc/v2/profiles', args);
      return data;
    },
    async deleteProfile(profileId: ProfileId): Promise<void> {
      await axios.delete<void>(`/kc/v2/profiles/${encodeURIComponent(profileId)}`);
    },
    async bulkAssign(profileId: ProfileId, args: BulkAssignRequest): Promise<CommonResponse> {
      const { data } = await axios.post<CommonResponse>(`/kc/v2/profiles/${encodeURIComponent(profileId)}/bulkAssign`, args);
      return data;
    },
    async bulkUnassign(args: BulkUnassignRequest): Promise<CommonResponse> {
      const { data } = await axios.post<CommonResponse>('/kc/v2/profiles/bulkUnassign', args);
      return data;
    },
    async bulkPush(profileId: ProfileId, args: BulkPushRequest): Promise<CommonResponse> {
      const { data } = await axios.post<CommonResponse>(`/kc/v2/profiles/${encodeURIComponent(profileId)}/bulkPush`, args);
      return data;
    },
    async createCustomPushNotification(profileId: ProfileId, args: CreateCustomPushNotificationRequest): Promise<CreateCustomPushNotificationResponse> {
      const { data } = await axios.post<CreateCustomPushNotificationResponse>(`/kc/v2/profiles/${encodeURIComponent(profileId)}/customNotifications`, args);
      return data;
    },
    async getCustomPushNotifications(profileId: ProfileId): Promise<GetCustomPushNotificationsResponse> {
      const { data } = await axios.get<GetCustomPushNotificationsResponse>(`/kc/v2/profiles/${encodeURIComponent(profileId)}/customNotifications`);
      return data;
    },
  } as const;
}
