import type { LicenseType } from '../license.types';
import type { DeviceId, DeviceWarning, ProfileId } from './types';

export type ScheduledPushInfo = {
  readonly pushScheduleId?: string;
  readonly scheduleTime?: number;
  readonly timeZone?: string;
};

export type DeviceDetails = {
  readonly profileInfo?: DeviceProfileInfo;
  readonly deviceInfo?: DeviceInfo;
  readonly licenseInfo?: DeviceLicenseInfo;
  readonly uploadInfo?: DeviceUploadInfo;
  readonly scheduledPushInfo?: ScheduledPushInfo;
  readonly configError?: { readonly code?: number; readonly reason?: string };
  readonly meta?: DeviceMeta;
  readonly tags?: readonly string[];
  readonly deviceState?: string;
  readonly orderBy?: string;
  readonly inProgress?: boolean;
  readonly lockAndUnlockInfo?: DeviceLockInfo;
  readonly configWarnings?: readonly DeviceWarning[];
  readonly exchanges?: readonly DeviceExchangeInfo[];
  readonly androidOsVersion?: string;
  readonly factoryResetPin?: string;
  readonly knoxVersion?: string;
  readonly assignedByInfo?: DeviceAssignedByInfo;
  readonly customId?: string;
  readonly lastSeenTime?: number;
  readonly isWithScheduledLock?: boolean;
};

export type DeviceProfileInfo = {
  readonly latestProfile?: boolean;
  readonly profileName?: string;
  readonly profileVersion?: string;
  readonly profileId?: ProfileId;
  readonly profileType?: string;
};

export type DeviceInfo = {
  readonly type?: string;
  readonly deviceId?: DeviceId;
  readonly model?: string;
  readonly enterprise?: boolean;
  readonly legacyEnterprise?: boolean;
  readonly deviceProductType?: string;
  readonly isOtherSamsungDevice?: boolean;
  readonly primaryImei?: string;
  readonly secondaryImei?: string;
};

export type DeviceLicenseInfo = {
  readonly serviceEndDate?: number;
  readonly serviceStartDate?: number;
  readonly licenseId?: string;
  readonly isLicenseExpired?: boolean;
  readonly kcLicenseType?: LicenseType;
};

export type DeviceUploadInfo = {
  readonly uploadId?: string;
  readonly uploadTime?: number;
  readonly uploadedBy?: string;
};

export type DeviceMeta = {
  readonly changedBy?: string;
  readonly lastChange?: number;
  readonly createTime?: number;
};

export type DeviceLockInfo = {
  readonly command?: string;
  readonly email?: string;
  readonly lockPassCode?: string;
  readonly name?: string;
  readonly phone?: string;
};

export type PreviousDeviceInfo = {
  readonly isOtherSamsungDevice?: boolean;
  readonly enrollType?: string;
  readonly mei?: string;
  readonly model?: string;
  readonly serial?: string;
};

export type DeviceExchangeInfo = {
  readonly deviceInformation?: PreviousDeviceInfo;
  readonly modifiedDate?: number;
  readonly state?: string;
};

export type DeviceAssignedByInfo = {
  readonly role?: string;
  readonly name?: string;
  readonly email?: string;
  readonly profileAlias?: { readonly id?: ProfileId; readonly alias?: string };
};
