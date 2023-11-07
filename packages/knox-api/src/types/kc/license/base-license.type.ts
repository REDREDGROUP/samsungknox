/** license type */
type KCLicenseType = 'PER_DEVICE_PLUS' | 'PER_SEAT';

/** Usage Type */
type KCUsageType = 'TRIAL' | 'COMMERCIAL';

/** Task Status */
type KCTaskStatus = 'PENDING' | 'INPROGRESS' | 'PARTIAL_COMPLETED' | 'COMPLETED' | 'INSOLVABLE';

/** Task Type */
type KCTaskType = 'REMIND_BEFORE_GRACE_PERIOD_ENDS' | 'END_GRACE_PERIOD';

/** usage types */
export type BaseKCLicenseUsageType = 'TRIAL' | 'COMMERCIAL';

export type BaseKCLicenseType = 'DYNAMIC_LEGACY' | 'SETUP_LEGACY' | 'DYNAMIC_LEGACY_EE' | 'PER_SEAT' | 'PER_DEVICE_PLUS';

/** possible license statuses */
export type BaseKCLicenseStatus = 'PENDING' | 'EXPIRED' | 'ACTIVE' | 'INACTIVE' | 'TERMINATED' | 'DELETED';

export type BaseKCLicenseAlert =
  | 'ACTIVE_LICENSE'
  | 'DEVICE_SERVICE_EXPIRED'
  | 'LICENSE_EXPIRED'
  | 'LOW_REMAINING_COUNT'
  | 'MAXED_OUT_LIMIT'
  | 'DEVICE_SERVICE_EXPIRING_SOON'
  | 'LICENSE_EXPIRING_SOON';

export type BaseKCLicense = {
  licenses: KCLicense[];
  statusCode: number;
  statusMessage: string;
  totalCount: number;
};

/**
 * Main type for the License
 * @property {number} activated - epoch time when the license was first activated
 * @property {number} activationEndDate - epoch time for when the license activation period ends
 * @property {number} activationStartDate - epoch time for when the license activation period starts
 * @property {number} alertType - indicates the license state that requires admin's attention
 * @property {number} assigned - number of devices using the license currently assigned a profile
 * @property {number} available - number of remaining purchased seats not yet assigned and activated
 * @property {number} createTime - epoch time when the license was created
 * @property {string} creator - email of the user who created the license
 * @property {string} customerId - identifier for the customer the license belongs to
 * @property {string} id - identifier for the license
 * @property {number} issuedDate - epoch time when the license was issued
 * @property {string} key - license key
 * @property {number} licensePeriod - the duration for which the license is valid
 * @property {string} lmsLicenseId - internal identifier of the license
 * @property {string} modifier - email of the user who modified the license
 * @property {string} name - name assigned to the license
 * @property {string} owner - owner of the license
 * @property {number} purchased - total number of purchased seats
 * @property {number} remaining - number of remaining seats not yet assigned and activated
 * @property {boolean} revocable - whether the license can be revoked from one device and used on another
 * @property {LicenseStatus} status - status of the license
 * @property {KCLicenseTask[]} tasks - associated tasks with the license
 * @property {number} total - total number of seats included in the license
 * @property {LicenseType} type - type of the license purchased
 * @property {number} updateTime - epoch time when the license was last updated
 * @property {UsageType} usageType - whether the license is a trial or for commercial use
 * @property {number} statusCode - code identifying the status of the license registration request
 * @property {string} statusMessage - message about the license registration request status
 * @property {number} totalCount - total count of registered licenses
 */
export type KCLicense = {
  activated: number;
  activationEndDate: number;
  activationStartDate: number;
  alertType: number;
  assigned: number;
  available: number;
  createTime: number;
  creator: string;
  customerId: string;
  id: string;
  issuedDate: number;
  key: string;
  licensePeriod: number;
  lmsLicenseId: string;
  modifier: string;
  name: string;
  owner: string;
  purchased: number;
  remaining: number;
  revocable: boolean;
  status: BaseKCLicenseStatus;
  tasks: KCLicenseTask[];
  total: number;
  type: KCLicenseType;
  updateTime: number;
  usageType: KCUsageType;
};

/**
 * Represents a task related to a license.
 * @property {number} completedOn - Epoch time when the task was completed.
 * @property {number} dueDate - Epoch time for the task's due date.
 * @property {number} processedOn - Epoch time when the task was processed.
 * @property {TaskStatus} status - Current status of the task.
 * @property {TaskType} type - Type of the task to be performed.
 */
type KCLicenseTask = {
  completedOn: number;
  dueDate: number;
  processedOn: number;
  status: KCTaskStatus;
  type: KCTaskType;
};
