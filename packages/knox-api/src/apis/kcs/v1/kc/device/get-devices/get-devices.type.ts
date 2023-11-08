/**
 * Represents the arguments required to fetch a paginated list of devices and profiles with sorting options.
 * @property {number} [pageNum=0] - The number of the page to be fetched. Defaults to 0.
 * @property {number} [pageSize=100] - Maximum number of records to be fetched in a call. Defaults to 100.
 * @property {string[]} [devices] - List of device IDs (IMEIs or serial numbers) to be retrieved.
 * @property {string[]} [profileIds] - Profile IDs of the devices to be retrieved.
 * @property {string} [sortBy="updateTime"] - Field on which results should be sorted when returned. Defaults to "updateTime".
 * @property {string} [sortOrder="descending"] - Order by which results should be arranged when returned. Defaults to "descending".
 */
export type KCGetDevicesArgs = {
  pageNum?: number;
  pageSize?: number;
  devices?: string[];
  profileIds?: string[];
  sortBy?: 'model' | 'state' | 'bulkEnrollProfile.name' | 'updateTime' | 'resellerUploadTime' | 'detailState';
  sortOrder?: 'ascending' | 'descending';
};

/**
 * Represents the warning information related to the device enrollment.
 * @property {string} api - API that triggered the warning.
 * @property {string} code - Error or warning code the device returned.
 * @property {string[]} packages - Packages that triggered the warning.
 * @property {string} reason - Reason for the failure or warning.
 */
type Warning = {
  api: string;
  code: string;
  packages: string[];
  reason: string;
};

/**
 * Represents anti-fraud information for the device.
 * @property {string} command - Lock or unlock command currently placed on the device.
 * @property {string} email - Email of the contact person as displayed on the locked device.
 * @property {string} lockPassCode - PIN required to unlock the device.
 * @property {string} name - Name of the contact person as displayed on the locked device.
 * @property {string} phone - Phone number of the contact person as displayed on the locked device.
 */
type KCAntiFraud = {
  command: string;
  email: string;
  lockPassCode: string;
  name: string;
  phone: string;
};

/**
 * Represents the device information prior to the IMEI exchange.
 * @property {string} country - Country the device is registered in.
 * @property {DeviceJdmInfo} deviceJdmInfo - Specifies the type of the device.
 * @property {string} fullModel - Long-form model number of the device.
 * @property {string} mei - MEI of the device before the IMEI exchange.
 * @property {string[]} meiHashes - Hashes generated against the previous device MEI.
 * @property {string} meid - MEID of the device before the IMEI exchange.
 * @property {string} model - Short-form model number of the device.
 * @property {Mpts} mpts - Result of MPTS validation of the previous MEI/serial.
 * @property {string} serial - Serial number of the device before the IMEI exchange.
 * @property {string[]} serialHashes - Hashes of the serial number.
 * @property {string} trimmedImei - Previous MEI of the device with the last character removed.
 * @property {string} trimmedSerial - Previous serial number of the device with the last character removed.
 * @property {number} modifiedDate - Date when the device's IMEI was exchanged.
 * @property {string} state - State of the device before the IMEI exchange.
 * @property {number} serviceEndDate - Date the device's license is set to end.
 * @property {number} serviceStartDate - Date when the device activated the license.
 * @property {string} licenseId - ID of the license the device is currently assigned to.
 * @property {boolean} isDeviceJdm - Indicates if the device is a JDM device.
 * @property {string} kcLicenseType - Type of license the device is currently assigned to.
 */
type DeviceInformation = {
  country: string;
  deviceJdmInfo: DeviceJdmInfo;
  fullModel: string;
  mei: string;
  meiHashes: string[];
  meid: string;
  model: string;
  mpts: Mpts;
  serial: string;
  serialHashes: string[];
  trimmedImei: string;
  trimmedSerial: string;
  modifiedDate: number;
  state: string;
  serviceEndDate: number;
  serviceStartDate: number;
  licenseId: string;
  isDeviceJdm: boolean;
  kcLicenseType: string;
};

/**
 * Represents the MPTS validation result information.
 * @property {string} deviceType - Mobile or Wearable.
 * @property {string} failureReason - Reason validation failed.
 * @property {string} result - Result of validation.
 */
type Mpts = {
  deviceType: string;
  failureReason: string;
  result: string;
};

/**
 * Represents the JDM information of a device.
 * @property {string} jdmType - Specifies if the device is JDM or ODM.
 */
type DeviceJdmInfo = {
  jdmType: 'JDM' | 'ODM';
};

/**
 * Represents each device's details in the device list response.
 * @property {boolean} latestProfile - Flag to determine whether the device is enrolled with the latest version of the profile.
 * @property {string} id - Internal ID used by Knox Configure.
 * ... all other properties as described ...
 */
export type GetKcDeviceResponse = {
  latestProfile: boolean;
  id: string;
  profileName: string;
  profileVersion: string;
  profileId: string;
  type: string;
  deviceUId: string;
  model: string;
  tags: string[];
  deviceState: string;
  changedBy: string;
  lastChange: number;
  createdBy: string;
  createTime: number;
  orderBy: string;
  orderTime: number;
  deviceErrCode?: number;
  uploadId: string;
  orderId: string;
  uploadTime: number;
  profileType: string;
  enterprise: boolean;
  deviceProductType: string;
  inProgress: boolean;
  kcAntiFraud?: KCAntiFraud;
  warnings?: Warning[];
  deviceErrReason?: string;
  profilesnapshotId?: string;
  pushScheduleId?: string;
  scheduleTime?: number;
  timeZone?: string;
  exchanges?: DeviceInformation[];
  // Assume there are no additional properties for this example
};

/**
 * Represents the complete device list response structure.
 * @property {GetKcDeviceResponse[]} deviceList - Array of device response objects.
 * @property {number} totalCount - Count of objects returned.
 */
export type KCGetDevicesResponse = {
  deviceList: GetKcDeviceResponse[];
  totalCount: number;
};
