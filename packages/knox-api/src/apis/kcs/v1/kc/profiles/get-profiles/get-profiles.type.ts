import { BaseKCProfileCountryISO, BaseKCProfileType, BaseKCProfileWifiProxySetting, BaseKCProfileWifiSecurity } from '~/types';

/** Enum for device product type */
type DeviceProductType = 'Wearable' | 'Phone' | 'Tablet';

/** Enum for sorting by field */
type SortBy = 'updateTime' | 'name';

/** Enum for sorting order */
type SortOrder = 'ascending' | 'descending';

/** Enum for device level */
type DeviceLevel = 'Knox' | 'Other';

/**
 * Represents API parameters for fetching profiles with detailed information about each property.
 * @property {number} [pageNum=0] - Field to support pagination. The number of the page to be fetched.
 * @property {number} [pageSize=100] - Maximum number of records to be fetched in a single call.
 * @property {string[]} [profileNames] - List of profile names to be filtered.
 * @property {string[]} [profileIds] - List of profileIds to be filtered.
 * @property {ProfileType} [profileType] - Type of profiles to be retrieved.
 * @property {string} [knoxVersion] - Knox version of profiles to be retrieved.
 * @property {SortBy} [sortBy="updateTime"] - Field on which results are sorted when they're returned.
 * @property {DeviceProductType} [deviceProductType] - Type of devices: Wearable, Phone, or Tablet.
 * @property {SortOrder} [sortOrder="descending"] - Order by which results should be arranged when they're returned.
 * @property {DeviceLevel} [deviceLevel] - Filter for Knox devices or other devices.
 */
export type GetKnoxConfigureProfilesArgsType = {
  pageNum?: number;
  pageSize?: number;
  profileNames?: string[];
  profileIds?: string[];
  profileType?: BaseKCProfileType;
  knoxVersion?: string;
  sortBy?: SortBy;
  deviceProductType?: DeviceProductType;
  sortOrder?: SortOrder;
  deviceLevel?: DeviceLevel;
};

/**
 * Represents API response for fetching profile summaries with detailed information about each property.
 * @property {KnoxConfigureProfileType[]} contents - List of profile objects.
 * @property {number} totalCount - Total count of profiles matching the filter.
 */
export type GetKnoxConfigureProfilesResponseType = {
  contents: KnoxConfigureProfileType[];
  totalCount: number;
};

/**
 * Summary response for a profile with detailed information about each property.
 * @property {number} applicationCount - Total number of apps currently being used by the profile.
 * @property {number[]} contentIds - List of IDs of contents uploaded during profile creation.
 * @property {boolean} customerApproved - This field is currently not used.
 * @property {string[]} defaultProfileResellers - List of names of resellers currently using the profile as their default profile.
 * @property {boolean} defaultedProfile - Flag to determine whether the profile is a default profile for a customer.
 * @property {string} description - Description of the profile.
 * @property {number} deviceCount - Total number of devices currently assigned to the profile.
 * @property {number} deviceDeclinedCount - This field is currently not used.
 * @property {'Knox' | 'Other'} deviceLevel - Specifies whether the profile is meant for Knox or for other devices.
 * @property {'Mobile' | 'Wearable'} deviceProductType - Type of device the profile is intended to be used with.
 * @property {number} deviceStateDeactivatedTemporarilyCount - Total number of devices with the status "DeactivatedTemporarily".
 * @property {number} deviceStateErrorCount - Total number of devices with the status "RegistrationFailed".
 * @property {number} deviceStateFailCount - This field is currently not used.
 * @property {number} deviceStateFailCountWithLastSuccessProfileSnapshot - This field is currently not used.
 * @property {number} deviceStateLockedCount - Total number of devices with the status "Locked".
 * @property {number} deviceStateOkCount - Total number of devices with the status "CustomizationSuccess".
 * @property {number} deviceStateReadyCount - Total number of devices with the status "ReadyForEnroll".
 * @property {number} deviceStateSkipCount - Total number of devices with the status "Skipped".
 * @property {number} deviceStateUpdatingCount - Total number of devices with the status "Updating".
 * @property {number} deviceStateWaitCount - This field is currently not used.
 * @property {number} deviceVerifiedCount - This field is currently not used.
 * @property {boolean} enterprise - This field is currently not used.
 * @property {string} [eulaTitle] - This field is currently not used.
 * @property {string} [eulaUrl] - This field is currently not used.
 * @property {number} [eulaVersion] - This field is currently not used.
 * @property {string} id - ID of the profile.
 * @property {string} knoxVersion - Knox version the profile is using.
 * @property {string} [modelNumber] - This field is currently not used.
 * @property {string} name - Name of the profile.
 * @property {boolean} profileComplete - Flag to determine whether the profile creation is complete.
 * @property {number} [profileSize] - This field is currently not used.
 * @property {'basic' | 'advanced'} profileType - Type of the profile.
 * @property {string} profileVersion - Latest version of the profile.
 * @property {string} [pushScheduleId] - Object ID of the scheduled push update request made with the profile.
 * @property {KnoxConfigureProfileTypeQRCodeEnrollmentType} [qrCodeEnrollment] - QR Code enrollment information (if applicable).
 * @property {number} [scheduleTime] - Date of the scheduled push update. Format: epoch.
 * @property {string} [segProfileId] - Internal Object ID used by SEG to serve profiles to device enrollment.
 * @property {boolean} [showEula] - This field is currently not used.
 * @property {string} [timeZone] - Timezone of the scheduled update.
 * @property {number} updateTime - Date of the last time the profile was updated. Format: epoch.
 */
type KnoxConfigureProfileType = {
  applicationCount: number;
  contentIds: number[];
  customerApproved: boolean;
  defaultProfileResellers: string[];
  defaultedProfile: boolean;
  description: string;
  deviceCount: number;
  deviceDeclinedCount: number;
  deviceLevel: 'Knox' | 'Other';
  deviceProductType: 'Mobile' | 'Wearable';
  deviceStateDeactivatedTemporarilyCount: number;
  deviceStateErrorCount: number;
  deviceStateFailCount: number;
  deviceStateFailCountWithLastSuccessProfileSnapshot: number;
  deviceStateLockedCount: number;
  deviceStateOkCount: number;
  deviceStateReadyCount: number;
  deviceStateSkipCount: number;
  deviceStateUpdatingCount: number;
  deviceStateWaitCount: number;
  deviceVerifiedCount: number;
  enterprise: boolean;
  eulaTitle?: string;
  eulaUrl?: string;
  eulaVersion?: number;
  id: string;
  knoxVersion: string;
  modelNumber?: string;
  name: string;
  profileComplete: boolean;
  profileSize?: number;
  profileType: BaseKCProfileType;
  profileVersion: string;
  pushScheduleId?: string;
  qrCodeEnrollment?: KnoxConfigureProfileTypeQRCodeEnrollmentType;
  scheduleTime?: number;
  segProfileId?: string;
  showEula?: boolean;
  timeZone?: string;
  updateTime: number;
};

/**
 * Represents the enrollment via QR code with detailed information about each property.
 * @property {boolean} allowQRCodeNotUploadedByReseller - Indicates whether QR code upload by reseller is allowed.
 * @property {string} clType - Type of client. Details on the types should be provided based on API documentation.
 * @property {CountryISO} countryISO - The country ISO code where the profile is applicable.
 * @property {boolean} hasWifiNetworkConfig - Indicates if Wi-Fi network configuration is included.
 * @property {string} profileId - The profile ID associated with the QR code.
 * @property {string} qrCodeBase64 - The QR code in base64 encoding.
 * @property {number} qrCodeCreateTime - The creation time of the QR code. Format: epoch.
 * @property {string} qrCodeForEnrollmentLink - A link to the enrollment page that the QR code points to.
 * @property {number} qrCodeModifiedTime - The last modified time of the QR code. Format: epoch.
 * @property {string} serviceIdentifier - Service identifier related to the QR code.
 * @property {boolean} skipMacRandomization - Indicates whether MAC address randomization should be skipped.
 * @property {string} ssidName - The name of the Wi-Fi network (SSID).
 * @property {WifiProxyDetails} wifiProxyDetails - Details about the Wi-Fi proxy configuration.
 * @property {WifiSecurityDetails} wifiSecurityDetails - Details about the Wi-Fi security configuration.
 */
type KnoxConfigureProfileTypeQRCodeEnrollmentType = {
  allowQRCodeNotUploadedByReseller: boolean;
  clType: string;
  countryISO: BaseKCProfileCountryISO;
  hasWifiNetworkConfig: boolean;
  profileId: string;
  qrCodeBase64: string;
  qrCodeCreateTime: number;
  qrCodeForEnrollmentLink: string;
  qrCodeModifiedTime: number;
  serviceIdentifier: string;
  skipMacRandomization: boolean;
  ssidName: string;
  wifiProxyDetails: WifiProxyDetails;
  wifiSecurityDetails: WifiSecurityDetails;
};

/**
 * Represents the details of a Wi-Fi proxy configuration with detailed information about each property.
 * @property {BaseKCProfileWifiProxySetting} wifiProxy - Type of Wi-Fi proxy configuration.
 * @property {WifiProxyAutoConfigDetails} [wifiProxyAutoConfigDetails] - Details for auto-configuration of Wi-Fi proxy.
 * @property {WifiProxyManualDetails} [wifiProxyManualDetails] - Details for manual configuration of Wi-Fi proxy.
 */
type WifiProxyDetails = {
  wifiProxy: BaseKCProfileWifiProxySetting;
  wifiProxyAutoConfigDetails?: WifiProxyAutoConfigDetails;
  wifiProxyManualDetails?: WifiProxyManualDetails;
};

/**
 * Details for auto-configuration of a Wi-Fi proxy.
 * @property {string} pacWebAddress - Web address for PAC (Proxy Auto-Configuration).
 */
type WifiProxyAutoConfigDetails = {
  pacWebAddress: string;
};

/**
 * Represents the details for manual configuration of a Wi-Fi proxy with detailed information about each property.
 * @property {string} byPassProxyFor - Comma-separated list of domains to bypass the proxy for.
 * @property {string} hostName - Host name or IP address of the proxy server.
 * @property {boolean} isAuthenticateServer - Indicates whether the proxy server requires authentication.
 * @property {number} port - Port number on which the proxy server is listening.
 * @property {string} userToken - A token used for authentication with the proxy server.
 * @property {string} username - Username for authentication with the proxy server.
 */
type WifiProxyManualDetails = {
  byPassProxyFor: string;
  hostName: string;
  isAuthenticateServer: boolean;
  port: number;
  userToken: string;
  username: string;
};

/**
 * Represents the details of Wi-Fi security configuration.
 */
type WifiSecurityDetails = {
  /** Type of security applied to the Wi-Fi connection. */
  security: BaseKCProfileWifiSecurity;
  /** A token related to the Wi-Fi security configuration. */
  securityToken: string;
};
