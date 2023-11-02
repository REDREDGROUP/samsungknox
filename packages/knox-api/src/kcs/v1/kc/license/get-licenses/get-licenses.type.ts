/** Enum for possible license types */
enum LicenseType {
  DYNAMIC_LEGACY = 'DYNAMIC_LEGACY',
  SETUP_LEGACY = 'SETUP_LEGACY',
  DYNAMIC_LEGACY_EE = 'DYNAMIC_LEGACY_EE',
  PER_SEAT = 'PER_SEAT',
  PER_DEVICE_PLUS = 'PER_DEVICE_PLUS',
}

/** Enum for possible license statuses */
enum LicenseStatus {
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
  DELETED = 'DELETED',
}

/** Enum for sort by fields */
enum SortByField {
  PURCHASED = 'purchased',
  AVAILABLE = 'available',
  ASSIGNED = 'assigned',
  ACTIVATED = 'activated',
  ACTIVATION_END_DATE = 'activationEndDate',
  UPDATE_TIME = 'updateTime',
}

/** Enum for sort order */
enum SortOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

/** Enum for alert types */
enum GetKnoxConfigureResponseLicenseAlertType {
  ACTIVE_LICENSE = 'ACTIVE_LICENSE',
  DEVICE_SERVICE_EXPIRED = 'DEVICE_SERVICE_EXPIRED',
  LICENSE_EXPIRED = 'LICENSE_EXPIRED',
  LOW_REMAINING_COUNT = 'LOW_REMAINING_COUNT',
  MAXED_OUT_LIMIT = 'MAXED_OUT_LIMIT',
  DEVICE_SERVICE_EXPIRING_SOON = 'DEVICE_SERVICE_EXPIRING_SOON',
  LICENSE_EXPIRING_SOON = 'LICENSE_EXPIRING_SOON',
}

/** Enum for license status */
enum GetKnoxConfigureResponseLicenseStatus {
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
  DELETED = 'DELETED',
}

/** Enum for license types */
enum GetKnoxConfigureResponseLicenseType {
  SETUP_LEGACY = 'SETUP_LEGACY',
  DYNAMIC_LEGACY = 'DYNAMIC_LEGACY',
  DYNAMIC_LEGACY_EE = 'DYNAMIC_LEGACY_EE',
  PER_DEVICE_PLUS = 'PER_DEVICE_PLUS',
  PER_SEAT = 'PER_SEAT',
  CUSTOM_SDK = 'CUSTOM_SDK',
  CUSTOM_SDK_KLM = 'CUSTOM_SDK_KLM',
}

/** Enum for usage types */
enum GetKnoxConfigureResponseLicenseUsageType {
  TRIAL = 'TRIAL',
  COMMERCIAL = 'COMMERCIAL',
}

/** Represents the structure of the query parameters for a license API call */
export type GetKnoxConfigureLicensesArgsType = {
  /** The number of the page to be fetched */
  pageNum?: number; // Default is 0
  /** Maximum number of records to be fetched in a call */
  pageSize?: number; // Default is 100
  /** List of license IDs */
  ids?: string[];
  /** List of LMS license IDs */
  lmsLicenseIds?: string[];
  /** Comma-separated list of license types */
  types?: LicenseType[];
  /** Comma-separated list of license statuses */
  status?: LicenseStatus[];
  /** Text to search for */
  searchText?: string;
  /** Comma-separated list of fields to search in */
  searchFields?: string; // Default is "key,name,owner"
  /** Field to sort results by */
  sortBy?: SortByField; // Default is "updateTime"
  /** Sort order */
  sortOrder?: SortOrder; // Default is "descending"
};

/** Represents an array of license response models */
export type GetKnoxConfigureLicensesResponseType = {
  licenses: GetKnoxConfigureLicensesType[];

  /** Number of licenses retrieved. */
  totalCount: number;
};

/** Represents a single license response model */
export type GetKnoxConfigureLicensesType = {
  activated: number;
  activationEndDate: number;
  activationStartDate: number;
  activeDeviceCount: number;
  alertType: GetKnoxConfigureResponseLicenseAlertType;
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
  status: GetKnoxConfigureResponseLicenseStatus;
  total: number;
  type: GetKnoxConfigureResponseLicenseType;
  usageType: GetKnoxConfigureResponseLicenseUsageType;
  totalCount: number;
};
