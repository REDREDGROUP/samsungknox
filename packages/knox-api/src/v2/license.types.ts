export type LicenseType = 'SETUP_PER_DEVICE' | 'SETUP_STAGGERED' | 'DYNAMIC_PER_DEVICE' | 'DYNAMIC_PER_SEAT' | 'DYNAMIC_LEGACY_EE';
export type LicenseStatus = 'Pending' | 'Expired' | 'Active' | 'Inactive' | 'Terminated' | 'Deleted';
export type LicenseUsage = 'TRIAL' | 'COMMERCIAL';
export type LicenseAlertType =
  | 'ActiveLicense'
  | 'DeviceServiceExpired'
  | 'LicenseExpired'
  | 'LowRemainingCount'
  | 'MaxedOutLimit'
  | 'DeviceServiceExpiringSoon'
  | 'LicenseExpiringSoon';

export type GetLicensesArgs = {
  readonly licenseKeys?: readonly string[];
  readonly types?: readonly LicenseType[];
  readonly status?: readonly LicenseStatus[];
  readonly searchText?: string;
  readonly searchFields?: readonly ('licenseKey' | 'name' | 'owner')[];
  readonly pageNum?: number;
  readonly pageSize?: number;
  readonly sortBy?: 'purchased' | 'available' | 'assigned' | 'activated' | 'activationEndDate' | 'updateTime';
  readonly sortOrder?: 'ascending' | 'descending';
};

export type LicenseKeyArgs = {
  readonly licenseKey: string;
};

export type RegisterLicenseArgs = LicenseKeyArgs & {
  readonly name: string;
};

export type LicenseSeatCount = {
  readonly purchased?: number;
  readonly assigned?: number;
  readonly activated?: number;
  readonly available?: number;
};

export type LicenseActivationInfo = {
  readonly activationStartDate?: number;
  readonly activationEndDate?: number;
};

/** Response properties are optional because the OpenAPI schemas have no required list. */
export type RegisterLicenseResponse = {
  readonly customerId?: string;
  readonly issuedDate?: number;
  readonly licenseKey?: string;
  readonly name?: string;
  readonly status?: LicenseStatus;
  readonly type?: LicenseType;
};

export type License = RegisterLicenseResponse & {
  readonly owner?: string;
  readonly usage?: LicenseUsage;
  readonly seatCount?: LicenseSeatCount;
  readonly activationInfo?: LicenseActivationInfo;
};

export type GetLicensesResponse = {
  readonly licenses?: readonly License[];
  readonly totalCount?: number;
};

export type GetLicenseDetailsResponse = License & {
  readonly alertType?: LicenseAlertType;
  readonly expiringSoonCount?: number;
  readonly transferable?: boolean;
};
