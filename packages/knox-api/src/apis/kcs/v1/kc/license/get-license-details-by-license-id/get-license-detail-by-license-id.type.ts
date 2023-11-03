import { BaseKCLicenseAlert, BaseKCLicenseStatus, BaseKCLicenseUsageType } from '~/types';

/** alert types */
type KCLicenseAlert = BaseKCLicenseAlert;

type KCLicenseStatus = BaseKCLicenseStatus;

type LicenseType = 'SETUP_LEGACY' | 'DYNAMIC_LEGACY' | 'DYNAMIC_LEGACY_EE' | 'PER_DEVICE_PLUS' | 'PER_SEAT' | 'CUSTOM_SDK' | 'CUSTOM_SDK_KLM';

/**
 * Type for an object with a required licenseType field
 * @property {licenseId} [string] - Type of the license.
 */
export type KCLicenseDetailArgs = {
  licenseId: string;
};

/**
 * Represents an array of license response models
 * @property {KCLicenses[]} [licenses] - Knox License
 * @property {number} [totalCount] - Number of licenses retrieved.
 */
export type KCLicensesDetailResponse = {
  licenses: KCLicenseDetail[];
  totalCount: number;
};

/**
 * Represents the detailed structure of a license response.
 * @property {number} activated - Number of seats that have been activated for use.
 * @property {number} activationEndDate - End date when license seats can no longer be assigned and activated. Format: epoch.
 * @property {number} activationStartDate - Date the license becomes active. Format: epoch.
 * @property {number} activeDeviceCount - Number of seats that have been activated for use with a deployed device and its profile.
 * @property {AlertType} alertType - Indicates that the license has reached a state that requires the admin's attention.
 * @property {number} assigned - Number of devices using the license that are currently assigned a profile.
 * @property {number} available - Number of remaining purchased seats that are not yet assigned to a device and activated.
 * @property {string} customerId - Identifier of the customer the license belongs to.
 * @property {number} expiringSoonCount - Count of licenses that are expiring soon.
 * @property {string} id - Identifier of the license.
 * @property {number} issuedDate - Date this license was issued. Format: epoch.
 * @property {string} key - License key.
 * @property {string} lmsLicenseId - Internal identifier of the license.
 * @property {string} name - Name assigned to the license when it was created or edited.
 * @property {string} owner - Name of the user that owns the license.
 * @property {number} purchased - Total number of purchased seats that can use this license.
 * @property {boolean} revocable - Whether it's possible to revoke a license on one device to use the license on another device.
 * @property {LicenseStatus} status - Status of the license.
 * @property {number} total - Total number of seats included in this license.
 * @property {LicenseType} type - Type of license purchased.
 * @property {UsageType} usageType - Whether the license is used for trial purposes or for commercial purposes.
 * @property {number} totalCount - Number of licenses retrieved.
 */
export type KCLicenseDetail = {
  activated: number;
  activationEndDate: number;
  activationStartDate: number;
  activeDeviceCount: number;
  alertType: KCLicenseAlert;
  assigned: number;
  available: number;
  customerId: string;
  expiringSoonCount: number;
  id: string;
  issuedDate: number;
  key: string;
  lmsLicenseId: string;
  name: string;
  owner: string;
  purchased: number;
  revocable: boolean;
  status: KCLicenseStatus;
  total: number;
  type: LicenseType;
  usageType: BaseKCLicenseUsageType;
  totalCount: number;
};
