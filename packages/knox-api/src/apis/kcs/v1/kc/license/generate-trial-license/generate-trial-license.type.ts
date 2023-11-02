/** license type */
type KCLicenseType = 'PER_DEVICE_PLUS' | 'PER_SEAT';

/**
 * Type for an object with a required licenseType field
 * @property {KCLicenseType} [licenseType] - Type of the license.
 */
export type KCTrialLicenseArgs = {
  licenseType: KCLicenseType;
};
