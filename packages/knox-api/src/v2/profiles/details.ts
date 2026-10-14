import type { ScheduledPushInfo } from '../device/details';
import type { ProfileId } from '../device/types';
import type { LicenseStatus, LicenseType, LicenseUsage } from '../license.types';
import type {
  AdditionalEula,
  CustomerSupport,
  DeviceLevel,
  DeviceProductType,
  ProductInfoScreen,
  ProfileApplicationId,
  ProfileContentId,
  ProfileType,
  QRCodeEnrollment,
  WelcomeScreenConfig,
} from './configuration';

export type ProfilePolicyEntry = {
  readonly id?: string;
  readonly category?: string;
  /** The schema specifies serialized JSON strings, not JSON objects. */
  readonly content?: string;
  readonly version?: string;
};

export type ProfilePolicy = {
  readonly advancedPolicies?: readonly ProfilePolicyEntry[];
  readonly customPolicy?: string;
  readonly dynamicPolicy?: {
    readonly policy?: string;
    readonly policyScript?: readonly ProfilePolicyEntry[];
  };
};

export type EnrollmentLicenseInfo = {
  readonly available?: number;
  readonly licenseKey?: string;
  readonly name?: string;
  readonly status?: LicenseStatus;
  readonly type?: LicenseType;
  readonly usage?: LicenseUsage;
};

export type GetProfileDetailsResponse = {
  readonly adminApplicationIds?: readonly ProfileApplicationId[];
  readonly applicationIds?: readonly ProfileApplicationId[];
  readonly contentIds?: readonly ProfileContentId[];
  readonly customerSupport?: CustomerSupport;
  readonly stateCount?: {
    readonly failedToConfigCount?: number;
    readonly errorCount?: number;
    readonly configuredCount?: number;
    readonly updatesPushedCount?: number;
  };
  readonly description?: string;
  readonly deviceCount?: number;
  readonly deviceLevel?: DeviceLevel;
  readonly deviceProductType?: DeviceProductType;
  readonly additionalEula?: AdditionalEula;
  readonly profileId?: ProfileId;
  readonly enrollmentLicenseInfo?: EnrollmentLicenseInfo;
  readonly knoxVersion?: string;
  readonly name?: string;
  readonly policy?: ProfilePolicy;
  readonly productInfoScreen?: ProductInfoScreen;
  readonly profileState?: 'Draft' | 'Active' | 'Deleted';
  readonly profileSize?: number;
  readonly profileType?: ProfileType;
  readonly profileVersion?: string;
  readonly scheduledPushInfo?: ScheduledPushInfo;
  readonly qrCodeEnrollment?: QRCodeEnrollment;
  readonly routines?: readonly string[];
  readonly selfUninstall?: boolean;
  readonly showEula?: boolean;
  readonly skipDefaultEulas?: boolean;
  readonly skipWelcomeScreen?: boolean;
  readonly supportKidsMode?: boolean;
  readonly updateTime?: number;
  readonly welcomeScreenConfig?: WelcomeScreenConfig;
  readonly remoteControlApplicationIds?: readonly ProfileApplicationId[];
};
