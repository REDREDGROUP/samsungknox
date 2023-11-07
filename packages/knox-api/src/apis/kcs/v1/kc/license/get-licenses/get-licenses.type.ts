import { BaseKCLicenseAlert, BaseKCLicenseStatus, BaseKCLicenseType, BaseKCLicenseUsageType } from '~/types';

/** possible license types */
type KCLicenseType = BaseKCLicenseType;

/** license types */
type KCResponseLicenseType = BaseKCLicenseType | 'CUSTOM_SDK' | 'CUSTOM_SDK_KLM';

/** possible license statuses */
type KCLicenseStatus = BaseKCLicenseStatus;

/** sort by fields */
type KCLicenseSortByField = 'purchased' | 'available' | 'assigned' | 'activated' | 'activationEndDate' | 'updateTime';

/** sort order */
type KCLicenseSortOrder = 'ascending' | 'descending';

/** alert types */
type KCLicenseAlert = BaseKCLicenseAlert;

/**
 * Represents the structure of the query parameters for a license API call
 * @property {number} [pageNum=0] - The number of the page to be fetched.
 * @property {number} [pageSize=100] - Maximum number of records to be fetched in a call.
 * @property {string[]} [ids] - List of license IDs.
 * @property {string[]} [lmsLicenseIds] - List of LMS license IDs.
 * @property {KCLicenseType[]} [types] - List of license types.
 * @property {KCLicenseStatus[]} [status] - List of license statuses.
 * @property {string} [searchText] - Text to search for.
 * @property {string} [searchFields="key,name,owner"] - Comma-separated list of fields to search in.
 * @property {KCLicenseSortByField} [sortBy="updateTime"] - Field to sort results by.
 * @property {KCLicenseSortOrder} [sortOrder="descending"] - Sort order.
 */
export type KCLicensesArgs = {
  pageNum?: number;
  pageSize?: number;
  ids?: string[];
  lmsLicenseIds?: string[];
  types?: KCLicenseType[];
  status?: KCLicenseStatus[];
  searchText?: string;
  searchFields?: string;
  sortBy?: KCLicenseSortByField;
  sortOrder?: KCLicenseSortOrder;
};

/**
 * Represents an array of license response models
 * @property {KCLicenses[]} [licenses] - Knox License
 * @property {number} [totalCount] - Number of licenses retrieved.
 */
export type KCLicensesResponse = {
  licenses: KCLicenses[];
  totalCount: number;
};

/**
 * Represents a single license response model with detailed information about each property.
 * @property {number} activated - Epoch time when the license was first activated.
 * @property {number} activationEndDate - Epoch time for when the license activation period ends.
 * @property {number} activationStartDate - Epoch time for when the license activation period starts.
 * @property {number} activeDeviceCount - Number of seats out of the total purchased that have been activated for use with a deployed device and its profile.
 * @property {KCLicenseAlert} alertType - Can be used to indicate that the license has reached a state that requires the admin's attention.
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
 * @property {KCLicenseStatus} status - Status of the license.
 * @property {number} total - Total number of seats included in this license.
 * @property {KCResponseLicenseType} type - Type of license purchased.
 * @property {BaseKCLicenseUsageType} usageType - Whether the license is used for trial purposes or for commercial purposes.
 * @property {number} totalCount - Total count of something (needs clarification on what this count is for).
 */
export type KCLicenses = {
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
  type: KCResponseLicenseType;
  usageType: BaseKCLicenseUsageType;
  totalCount: number;
};
