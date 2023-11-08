/**
 * Contains information about the Knox Configure profile to be assigned to devices.
 * @property {string} licenseId - ID of the license to be used. If not provided, the profile must have the license attached.
 * @property {string} licenseKey - License to be used.
 * @property {string} profileId - ID of the profile. This is required if the profileName is not provided.
 * @property {string} profileName - Name of the profile. This is required if the profileId is not provided.
 * @property {boolean} replaceLicense - Flag specifying whether to replace the existing license.
 */
type KCAssignProfileFeature = {
  licenseId: string;
  licenseKey: string;
  profileId: string;
  profileName: string;
  replaceLicense: boolean;
};

/**
 * Represents the request for assigning Knox Configure profiles to devices.
 * @property {KCAssignProfileFeature} assignFeature - Profile information to be assigned to devices.
 * @property {string[]} deviceIds - IMEIs or serial numbers of devices a profile will be assigned to.
 */
export type KCAssignProfileDeviceArgs = {
  assignFeature: KCAssignProfileFeature;
  deviceIds: string[];
};

/**
 * Assign the list of the customer devices to a designated Knox Configure profile and a specified license.
 * @property {number} failedCount - Count of devices that could not be assigned to the profile.
 * @property {number} pendingCount - Count of devices that were successfully selected for profile assignment.
 * @property {number} successCount - Count of devices that were successfully assigned.
 * @property {number} totalCount - Total number of devices.
 */
export type KCAssignProfileDeviceResponse = {
  failedCount: number;
  pendingCount: number;
  successCount: number;
  totalCount: number;
};
