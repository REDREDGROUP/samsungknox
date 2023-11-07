import {
  BaseKCLicenseStatus,
  BaseKCLicenseType,
  BaseKCLicenseUsageType,
  BaseKCProfileCountryISO,
  BaseKCProfileDeviceLevel,
  BaseKCProfileType,
  BaseKCProfileWifiProxySetting,
  BaseKCProfileWifiSecurity,
} from '~/types';

/**
 * Represents the arguments required to retrieve profile details.
 * @property {string} profileId - The ID of the profile to be retrieved.
 */
export type KCGetProfileDetailsArgs = {
  profileId: string;
};

/**
 * Represents the response schema for a JSON response.
 * @property {Array<number>} adminApplicationIds - List of IDs of applications currently being used by the profile that are classified as an admin app.
 * @property {Array<number>} applicationIds - List of IDs of applications currently being used by the profile.
 * @property {Array<number>} contentIds - List of IDs of contents uploaded during profile creation.
 * @property {KCProfileCustomerSupport} customerSupport - Contains the company and customer support details of the profile.
 * @property {number} customizationFailCount - Total number of devices currently assigned to the profile that have a status of "CustomizationFailed".
 * @property {string} description - Description of the profile.
 * @property {number} deviceCount - Total number of devices currently assigned to the profile.
 * @property {BaseKCProfileDeviceLevel} deviceLevel - Specifies whether the profile is meant for Knox or for other devices.
 * @property {string} deviceProductType - Type of device the profile is intended to be used with. This can be "Mobile" or "Wearable".
 * @property {number} deviceStateErrorCount - Total number of devices currently assigned to the profile that have a status of "RegistrationFailed".
 * @property {number} deviceStateFailCountWithLastSuccessProfileSnapshot - This is currently not used.
 * @property {number} deviceStateOKCount - Total number of devices currently assigned to the profile that have a status of "CustomizationSuccess".
 * @property {number} deviceStateUpdatingCount - Total number of devices currently assigned to the profile that have a status of "Updating".
 * @property {boolean} enterprise - This is currently not used.
 * @property {AddTnCRequest} eula - Additional end-user license agreement (EULA).
 * @property {string} id - ID of the profile. This is the same ID returned by Get Devices.
 * @property {KDADefaultLicense} kdaDefaultLicense - Default license to be used when a profile is used for the Knox Deployment App (NFC/Bluetooth/Wi-Fi enrollment).
 * @property {string} knoxVersion - Knox version the profile is using.
 * @property {Array<number>} licenseIds - List of IDs of licenses currently being used by the profile.
 * @property {string} modelNumber - This is currently not used.
 * @property {string} name - Name of the profile.
 * @property {CCPolicy} policy - JSON object that contains all the configurations meant for the device.
 * @property {boolean} profileComplete - Flag to determine whether the profile creation is complete.
 * @property {number} profileSize - This is currently not used.
 * @property {string} profileType - Type of the profile. This can be "basic" or "advanced".
 * @property {string} profileVersion - Latest version of the profile.
 * @property {string} pushScheduleId - Object ID of the scheduled push update request made with the profile.
 * @property {KCProfileQRCodeEnrollment} qrCodeEnrollment -
 * @property {string} recommendationId -
 * @property {number} scheduleTime - Date of the scheduled push update. Format: epoch.
 * @property {string} segProfileId - Internal Object ID used by SEG to serve profiles to device enrollment.
 * @property {boolean} showEula - This is currently not used.
 * @property {boolean} skipDefaultEulas - Flag to determine whether to skip default end user license agreements.
 * @property {boolean} skipWelcomeScreen - Flag to determine whether to skip the welcome screen.
 * @property {string} timeZone - Timezone of the scheduled update.
 * @property {number} updateTime - Date of the last time the profile was updated. Format: epoch.
 * @property {KCProfileAddWelcomeScreenConfig} welcomeScreenConfig - Branding customization for the background and logo.
 */

export type KCGetProfileDetailsResponse = {
  adminApplicationIds: Array<number>;
  applicationIds: Array<number>;
  contentIds: Array<number>;
  customerSupport: KCProfileCustomerSupport;
  customizationFailCount: number;
  description: string;
  deviceCount: number;
  deviceLevel: BaseKCProfileDeviceLevel;
  deviceProductType: 'Mobile' | 'Wearable';
  deviceStateErrorCount: number;
  deviceStateFailCountWithLastSuccessProfileSnapshot: number;
  deviceStateOKCount: number;
  deviceStateUpdatingCount: number;
  enterprise: boolean;
  eula: AddTnCRequest;
  id: string;
  kdaDefaultLicense: KDADefaultLicense;
  knoxVersion: string;
  licenseIds: Array<number>;
  modelNumber: string;
  name: string;
  policy: CCPolicy;
  profileComplete: boolean;
  profileSize: number;
  profileType: BaseKCProfileType;
  profileVersion: string;
  pushScheduleId: string;
  qrCodeEnrollment: KCProfileQRCodeEnrollment;
  recommendationId: string;
  scheduleTime: number;
  segProfileId: string;
  showEula: boolean;
  skipDefaultEulas: boolean;
  skipWelcomeScreen: boolean;
  timeZone: string;
  updateTime: number;
  welcomeScreenConfig: KCProfileAddWelcomeScreenConfig;
};

/**
 * Represents the customer support details of the profile.
 * @property {string} city - City that appears during enrollment.
 * @property {string} companyName - Company name that appears during enrollment.
 * @property {string} country - Country that appears during enrollment.
 * @property {string} mailingAddress1 - Address line 1 of the company's location.
 * @property {string} mailingAddress2 - Address line 2 of the company's location.
 * @property {string} province - Province that appears during enrollment.
 * @property {string} supportEmailAddress - Email address for contacting customer support.
 * @property {string} supportPhoneNumber - Phone number for contacting customer support.
 * @property {string} zipCode - Zip code that appears during enrollment.
 */
export type KCProfileCustomerSupport = {
  city: string;
  companyName: string;
  country: string;
  mailingAddress1: string;
  mailingAddress2: string;
  province: string;
  supportEmailAddress: string;
  supportPhoneNumber: string;
  zipCode: string;
};

/**
 * Represents additional end-user license agreement (EULA) details.
 * @property {string} termsAndConditions - The terms and conditions of the EULA to be added.
 * @property {string} title - Title of the EULA to be added.
 * @property {string} type - The context in which the EULA appears. Can be "enrollment", "adminPortal", "updateEula", or "specialPermission".
 * - "enrollment": EULA appears on the device during the enrollment process.
 * - "adminPortal": EULA appears in the Knox Configure admin portal.
 * - "updateEula": EULA appears during a software push update.
 * - "specialPermission": EULA appears when special permissions are being granted to the end user.
 */
export type AddTnCRequest = {
  termsAndConditions: string;
  title: string;
  type: 'enrollment' | 'adminPortal' | 'updateEula' | 'specialPermission';
};

/**
 * Represents the default license information for the Knox Deployment App.
 * @property {number} available - The number of licenses available.
 * @property {string} id - Object ID of the license.
 * @property {string} name - Name of the license.
 * @property {string} status - State of the license. Can be "PENDING", "EXPIRED", "ACTIVE", "INACTIVE", "TERMINATED", or "DELETED".
 * @property {string} type - Type of the license. Can be "SETUP_LEGACY", "DYNAMIC_LEGACY", "DYNAMIC_LEGACY_EE", "PER_DEVICE_PLUS", "PER_SEAT", "CUSTOM_SDK", or "CUSTOM_SDK_KLM".
 * @property {string} usage - Specifies how the license will be used. Can be "TRIAL" or "COMMERCIAL".
 */
export type KDADefaultLicense = {
  available: number;
  id: string;
  name: string;
  status: BaseKCLicenseStatus;
  type: BaseKCLicenseType | 'CUSTOM_SDK' | 'CUSTOM_SDK_KLM';
  usage: BaseKCLicenseUsageType;
};

/**
 * Represents an advanced policy with configuration details.
 * @property {string} id - The unique identifier of the advanced policy.
 * @property {string} category - The category of the advanced policy.
 * @property {string} content - The content of the advanced policy.
 * @property {string} version - The version of the advanced policy.
 */
export type AdvancedPolicy = {
  id: string;
  category: string;
  content: string;
  version: string;
};

/**
 * Represents a dynamic policy object.
 * @property {string} policy - The stringified JSON content of the dynamic policy.
 */
export type CCDynamicPolicy = {
  policy: string;
};

/**
 * Represents a script within a policy.
 * @property {string} id - The unique identifier of the policy script.
 * @property {string} category - The category of the policy script.
 * @property {string} format - The format of the policy script.
 * @property {string} content - The content of the policy script.
 * @property {string} version - The version of the policy script.
 */
export type CCPolicyScript = {
  id: string;
  category: string;
  format: string;
  content: string;
  version: string;
};

/**
 * Represents the policy details that contain all the configurations meant for the device.
 * @property {AdvancedPolicy[]} advancedPolicies - An array of advanced policies.
 * @property {string} customPolicy - A string representing custom policy.
 * @property {CCDynamicPolicy} dynamicPolicy - An object representing dynamic policy.
 * @property {CCPolicyScript[]} policyScript - An array of policy scripts.
 */
export type CCPolicy = {
  advancedPolicies: AdvancedPolicy[];
  customPolicy: string;
  dynamicPolicy: CCDynamicPolicy;
  policyScript: CCPolicyScript[];
};

/**
 * Represents details for auto-configuring WiFi proxy settings.
 * @property {string} pacWebAddress - The PAC web address for the WiFi proxy configuration.
 */
export type WifiProxyAutoConfigDetails = {
  pacWebAddress: string;
};

/**
 * Represents manual details for configuring WiFi proxy settings.
 * @property {string} byPassProxyFor - Domains for which the proxy should not be used.
 * @property {string} hostName - The hostname of the proxy server.
 * @property {boolean} isAuthenticateServer - Indicates if server authentication is required.
 * @property {number} port - The port number of the proxy server.
 * @property {string} userToken - The user token for proxy authentication.
 * @property {string} username - The username for proxy authentication.
 */
export type WifiProxyManualDetails = {
  byPassProxyFor: string;
  hostName: string;
  isAuthenticateServer: boolean;
  port: number;
  userToken: string;
  username: string;
};

/**
 * Represents security details for a WiFi network configuration.
 * @property {string} security - The type of security for the WiFi network. Can be "NONE", "WEP", "WPA", "WPA_WPA2".
 * @property {string} securityToken - The security token or password for the WiFi network.
 */
export type WifiSecurityDetails = {
  security: BaseKCProfileWifiSecurity;
  securityToken: string;
};

/**
 * Represents WiFi proxy details for a WiFi network configuration.
 * @property {BaseKCProfileWifiProxySetting} wifiProxy - The type of WiFi proxy configuration. Can be "NONE", "MANUAL", "AUTO_CONFIGURE".
 * @property {WifiProxyAutoConfigDetails} wifiProxyAutoConfigDetails - Details for auto-configuring WiFi proxy.
 * @property {WifiProxyManualDetails} wifiProxyManualDetails - Details for manual WiFi proxy configuration.
 */
export type WifiProxyDetails = {
  wifiProxy: BaseKCProfileWifiProxySetting;
  wifiProxyAutoConfigDetails: WifiProxyAutoConfigDetails;
  wifiProxyManualDetails: WifiProxyManualDetails;
};

/**
 * Represents the QR Code enrollment details.
 * @property {boolean} allowQRCodeNotUploadedByReseller - Flag to allow QR code not uploaded by reseller.
 * @property {string} clType - Classification type of the QR code.
 * @property {string} countryISO - Country ISO code. Can be "US", "EU", "CN", "ALL".
 * @property {boolean} hasWifiNetworkConfig - Indicates if WiFi network configuration is available.
 * @property {string} profileId - The ID of the profile associated with the QR code.
 * @property {string} qrCodeBase64 - Base64-encoded representation of the QR code.
 * @property {number} qrCodeCreateTime - Creation time of the QR code in epoch milliseconds.
 * @property {string} qrCodeForEnrollmentLink - URL link for enrollment using the QR code.
 * @property {number} qrCodeModifiedTime - Last modified time of the QR code in epoch milliseconds.
 * @property {string} serviceIdentifier - Service identifier for the QR code enrollment.
 * @property {boolean} skipMacRandomization - Flag to skip MAC randomization.
 * @property {string} ssidName - Name of the WiFi network SSID.
 * @property {WifiProxyDetails} wifiProxyDetails - Details of the WiFi proxy settings.
 */
export type KCProfileQRCodeEnrollment = {
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
};

/**
 * Represents branding settings for background or foreground customization.
 * @property {string} brandingType - Specifies the type of branding customization. Can be "IMAGE" or "COLOR".
 * @property {string} content - Content ID of the uploaded image or hex code of the color.
 * @property {string} fileName - Path and filename of the image, if brandingType is IMAGE.
 */
export type KCProfileBrandingSetting = {
  brandingType: 'IMAGE' | 'COLOR';
  content: string;
  fileName?: string;
};

/**
 * Represents the welcome screen configuration details for branding customization.
 * @property {string} alignmentType - Specifies the alignment of the screen's contents. Can be "TOP", "CENTER", "BOTTOM".
 * @property {KCProfileBrandingSetting} backGroundSetting - Branding settings for the background customization.
 * @property {KCProfileBrandingSetting} foreGroundSetting - Branding settings for the foreground customization.
 * @property {boolean} hasCustomText - Indicates whether there will be custom text on the enrollment screen.
 * @property {boolean} hideSupportLink - Indicates whether to hide the support link on the enrollment screen.
 * @property {string} textBody - Custom text to display on the enrollment screen, if applicable.
 */
export type KCProfileAddWelcomeScreenConfig = {
  alignmentType: 'TOP' | 'CENTER' | 'BOTTOM';
  backGroundSetting: KCProfileBrandingSetting;
  foreGroundSetting: KCProfileBrandingSetting;
  hasCustomText: boolean;
  hideSupportLink?: boolean;
  textBody?: string;
};
