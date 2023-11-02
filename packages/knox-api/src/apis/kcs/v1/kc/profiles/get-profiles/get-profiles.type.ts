/** Enum for profile type */
type ProfileType = 'basic' | 'advanced';

/** Enum for device product type */
type DeviceProductType = 'Wearable' | 'Phone' | 'Tablet';

/** Enum for sorting by field */
type SortBy = 'updateTime' | 'name';

/** Enum for sorting order */
type SortOrder = 'ascending' | 'descending';

/** Enum for device level */
type DeviceLevel = 'Knox' | 'Other';

type CountryISO = 'US' | 'EU' | 'CN' | 'ALL';

/** Enum for Wi-Fi proxy settings */
type WifiProxySetting = 'NONE' | 'MANUAL' | 'AUTO_CONFIGURE';

/** Enum for Wi-Fi security types */
type WifiSecurityType = 'NONE' | 'WEP' | 'WPA' | 'WPA_WPA2';

/**
 * API parameters for fetching profiles with optional pagination and filtering.
 */
export type GetKnoxConfigureProfilesArgsType = {
  /**
   * Field to support pagination. The number of the page to be fetched.
   * @default 0
   */
  pageNum?: number;

  /**
   * Maximum number of records to be fetched in a call.
   * @default 100
   */
  pageSize?: number;

  /**
   * List of profile names to be filtered.
   */
  profileNames?: string[];

  /**
   * List of profileIds to be filtered.
   */
  profileIds?: string[];

  /**
   * Type of profiles to be retrieved.
   */
  profileType?: ProfileType;

  /**
   * Knox version of profiles to be retrieved.
   */
  knoxVersion?: string;

  /**
   * Field on which results are sorted when they're returned.
   * @default "updateTime"
   */
  sortBy?: SortBy;

  /**
   * Type of devices: Wearable, Phone, or Tablet.
   */
  deviceProductType?: DeviceProductType;

  /**
   * Order by which results should be arranged when they're returned.
   * @default "descending"
   */
  sortOrder?: SortOrder;

  /**
   * Filter for Knox devices or other devices.
   */
  deviceLevel?: DeviceLevel;
};

/**
 * API response for fetching profile summaries.
 */
export type GetKnoxConfigureProfilesResponseType = {
  /** List of profile objects. */
  contents: KnoxConfigureProfileType[];
  /** Total count of profiles matching the filter. */
  totalCount: number;
};

/**
 * Summary response for a profile.
 */
type KnoxConfigureProfileType = {
  /** Total number of apps currently being used by the profile. */
  applicationCount: number;
  /** List of IDs of contents uploaded during profile creation. */
  contentIds: number[];
  /** This field is currently not used. */
  customerApproved: boolean;
  /** List of names of resellers currently using the profile as their default profile. */
  defaultProfileResellers: string[];
  /** Flag to determine whether the profile is a default profile for a customer. */
  defaultedProfile: boolean;
  /** Description of the profile. */
  description: string;
  /** Total number of devices currently assigned to the profile. */
  deviceCount: number;
  /** This field is currently not used. */
  deviceDeclinedCount: number;
  /** Specifies whether the profile is meant for Knox or for other devices. */
  deviceLevel: 'Knox' | 'Other';
  /** Type of device the profile is intended to be used with. Can be Mobile or Wearable. */
  deviceProductType: 'Mobile' | 'Wearable';
  /** Total number of devices with the status "DeactivatedTemporarily". */
  deviceStateDeactivatedTemporarilyCount: number;
  /** Total number of devices with the status "RegistrationFailed". */
  deviceStateErrorCount: number;
  /** This field is currently not used. */
  deviceStateFailCount: number;
  /** This field is currently not used. */
  deviceStateFailCountWithLastSuccessProfileSnapshot: number;
  /** Total number of devices with the status "Locked". */
  deviceStateLockedCount: number;
  /** Total number of devices with the status "CustomizationSuccess". */
  deviceStateOkCount: number;
  /** Total number of devices with the status "ReadyForEnroll". */
  deviceStateReadyCount: number;
  /** Total number of devices with the status "Skipped". */
  deviceStateSkipCount: number;
  /** Total number of devices with the status "Updating". */
  deviceStateUpdatingCount: number;
  /** This field is currently not used. */
  deviceStateWaitCount: number;
  /** This field is currently not used. */
  deviceVerifiedCount: number;
  /** This field is currently not used. */
  enterprise: boolean;
  /** This field is currently not used. */
  eulaTitle?: string;
  /** This field is currently not used. */
  eulaUrl?: string;
  /** This field is currently not used. */
  eulaVersion?: number;
  /** ID of the profile. */
  id: string;
  /** Knox version the profile is using. */
  knoxVersion: string;
  /** This field is currently not used. */
  modelNumber?: string;
  /** Name of the profile. */
  name: string;
  /** Flag to determine whether the profile creation is complete. */
  profileComplete: boolean;
  /** This field is currently not used. */
  profileSize?: number;
  /** Type of the profile. Can be "basic" or "advanced". */
  profileType: 'basic' | 'advanced';
  /** Latest version of the profile. */
  profileVersion: string;
  /** Object ID of the scheduled push update request made with the profile. */
  pushScheduleId?: string;
  /** QR Code enrollment information (if applicable). */
  qrCodeEnrollment?: KnoxConfigureProfileTypeQRCodeEnrollmentType;
  /** Date of the scheduled push update. Format: epoch. */
  scheduleTime?: number;
  /** Internal Object ID used by SEG to serve profiles to device enrollment. */
  segProfileId?: string;
  /** This field is currently not used. */
  showEula?: boolean;
  /** Timezone of the scheduled update. */
  timeZone?: string;
  /** Date of the last time the profile was updated. Format: epoch. */
  updateTime: number;
};

/**
 * Represents the enrollment via QR code.
 * Further properties should be added according to the actual structure.
 */
type KnoxConfigureProfileTypeQRCodeEnrollmentType = {
  /** Indicates whether QR code upload by reseller is allowed. */
  allowQRCodeNotUploadedByReseller: boolean;
  /** Type of client. Details on the types should be provided based on API documentation. */
  clType: string;
  /** The country ISO code where the profile is applicable. */
  countryISO: CountryISO;
  /** Indicates if Wi-Fi network configuration is included. */
  hasWifiNetworkConfig: boolean;
  /** The profile ID associated with the QR code. */
  profileId: string;
  /** The QR code in base64 encoding. */
  qrCodeBase64: string;
  /** The creation time of the QR code. Format: epoch. */
  qrCodeCreateTime: number;
  /** A link to the enrollment page that the QR code points to. */
  qrCodeForEnrollmentLink: string;
  /** The last modified time of the QR code. Format: epoch. */
  qrCodeModifiedTime: number;
  /** Service identifier related to the QR code. */
  serviceIdentifier: string;
  /** Indicates whether MAC address randomization should be skipped. */
  skipMacRandomization: boolean;
  /** The name of the Wi-Fi network (SSID). */
  ssidName: string;
  /** Details about the Wi-Fi proxy configuration. */
  wifiProxyDetails: WifiProxyDetails;
  /** Details about the Wi-Fi security configuration. */
  wifiSecurityDetails: WifiSecurityDetails;
};

/**
 * Represents the details of a Wi-Fi proxy configuration.
 */
type WifiProxyDetails = {
  /** Type of Wi-Fi proxy configuration. */
  wifiProxy: WifiProxySetting;
  /** Details for auto-configuration of Wi-Fi proxy. */
  wifiProxyAutoConfigDetails?: WifiProxyAutoConfigDetails;
  /** Details for manual configuration of Wi-Fi proxy. */
  wifiProxyManualDetails?: WifiProxyManualDetails;
};

/**
 * Details for auto-configuration of a Wi-Fi proxy.
 */
type WifiProxyAutoConfigDetails = {
  /** Web address for PAC (Proxy Auto-Configuration). */
  pacWebAddress: string;
};

/**
 * Details for manual configuration of a Wi-Fi proxy.
 */
type WifiProxyManualDetails = {
  /** Comma-separated list of domains to bypass the proxy for. */
  byPassProxyFor: string;
  /** Host name or IP address of the proxy server. */
  hostName: string;
  /** Indicates whether the proxy server requires authentication. */
  isAuthenticateServer: boolean;
  /** Port number on which the proxy server is listening. */
  port: number;
  /** A token used for authentication with the proxy server. */
  userToken: string;
  /** Username for authentication with the proxy server. */
  username: string;
};

/**
 * Represents the details of Wi-Fi security configuration.
 */
type WifiSecurityDetails = {
  /** Type of security applied to the Wi-Fi connection. */
  security: WifiSecurityType;
  /** A token related to the Wi-Fi security configuration. */
  securityToken: string;
};
