import type { DeviceId, ProfileId, SortOrder } from '../device/types';
import type {
  AdditionalEula,
  CustomerSupport,
  DeviceLevel,
  DeviceProductType,
  FolderConfig,
  LockScreenHiddenWidgets,
  ProductInfoScreen,
  ProfileApplicationId,
  ProfileType,
  QRCodeEnrollment,
  WelcomeScreenConfig,
} from './configuration';

export type GetProfilesRequest = {
  readonly profileNames?: readonly string[];
  readonly profileIds?: readonly ProfileId[];
  readonly profileType?: ProfileType;
  readonly knoxVersion?: string;
  readonly deviceProductType?: DeviceProductType;
  readonly deviceLevel?: DeviceLevel;
  readonly pageNum?: number;
  readonly pageSize?: number;
  readonly sortBy?: 'updateTime' | 'name';
  readonly sortOrder?: SortOrder;
};

export type ProfileSummary = {
  readonly applicationCount?: number;
  readonly contentCount?: number;
  readonly description?: string;
  readonly deviceCount?: number;
  readonly deviceLevel?: DeviceLevel;
  readonly deviceProductType?: DeviceProductType;
  readonly profileId?: ProfileId;
  readonly knoxVersion?: string;
  readonly name?: string;
  readonly profileState?: 'Draft' | 'Active' | 'Deleted';
  readonly profileSize?: number;
  readonly profileType?: ProfileType;
  readonly profileVersion?: string;
  readonly qrCodeEnrollment?: QRCodeEnrollment;
  readonly selfUninstall?: boolean;
  readonly updateTime?: number;
};

export type GetProfilesResponse = {
  readonly profiles?: readonly ProfileSummary[];
  readonly totalCount?: number;
};

export type CreateProfileRequest = {
  readonly additionalEula?: AdditionalEula;
  readonly applicationIds?: readonly ProfileApplicationId[];
  readonly customerSupport?: CustomerSupport;
  readonly description?: string;
  readonly deviceLevel?: DeviceLevel;
  readonly folderConfig?: FolderConfig;
  readonly enrollmentLicenseKey?: string;
  readonly knoxVersion?: string;
  readonly name: string;
  readonly welcomeScreenConfig?: WelcomeScreenConfig;
  readonly productInfoScreen?: ProductInfoScreen;
  readonly profileType?: ProfileType;
  readonly lockScreenHiddenWidgets?: LockScreenHiddenWidgets;
};

export type CreateProfileResponse = {
  readonly profileId?: ProfileId;
  readonly name?: string;
  readonly createTime?: number;
};

export type BulkAssignRequest = {
  readonly licenseKey: string;
  readonly deviceIds: readonly DeviceId[];
};

export type BulkUnassignRequest = {
  readonly deviceIds: readonly DeviceId[];
};

export type BulkPushRequest = {
  readonly profilePushType: 'ProfilePush' | 'ProfileDeltaPush';
  /** Omit to update every device currently assigned to the profile. */
  readonly deviceIds?: readonly DeviceId[];
  readonly noUserConsent?: boolean;
  readonly customPushMessageId?: string;
};

export type CreateCustomPushNotificationRequest = {
  /** Must match the profile version. */
  readonly version: string;
  readonly message: string;
  readonly hyperlink?: string;
};

export type CreateCustomPushNotificationResponse = {
  readonly id?: string;
};

export type CustomPushNotification = {
  readonly id?: string;
  readonly version?: string;
  readonly message?: string;
  readonly hyperlink?: string;
  readonly latestSelected?: boolean;
};

export type GetCustomPushNotificationsResponse = {
  readonly messages?: readonly CustomPushNotification[];
};
