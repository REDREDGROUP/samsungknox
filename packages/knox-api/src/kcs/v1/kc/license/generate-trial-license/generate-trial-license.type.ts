/** Enum for possible license types */
enum LicenseTypeEnum {
  DYNAMIC_LEGACY = 'DYNAMIC_LEGACY',
  SETUP_LEGACY = 'SETUP_LEGACY',
  DYNAMIC_LEGACY_EE = 'DYNAMIC_LEGACY_EE',
  PER_SEAT = 'PER_SEAT',
  PER_DEVICE_PLUS = 'PER_DEVICE_PLUS',
}

/** Enum for the license type */
type LicenseType = 'PER_DEVICE_PLUS' | 'PER_SEAT';

/** Enum for License Status */
type LicenseStatus = 'PENDING' | 'EXPIRED' | 'ACTIVE' | 'INACTIVE' | 'TERMINATED' | 'DELETED';

/** Enum for Usage Type */
enum UsageType {
  TRIAL = 'TRIAL',
  COMMERCIAL = 'COMMERCIAL',
}

/** Enum for Task Status */
enum TaskStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  PARTIAL_COMPLETED = 'PARTIAL_COMPLETED',
  COMPLETED = 'COMPLETED',
  INSOLVABLE = 'INSOLVABLE',
}

/** Enum for Task Type */
enum TaskType {
  REMIND_BEFORE_GRACE_PERIOD_ENDS = 'REMIND_BEFORE_GRACE_PERIOD_ENDS',
  END_GRACE_PERIOD = 'END_GRACE_PERIOD',
}

/** Type for an object with a required licenseType field */
export type GenerateKnoxConfigureTrialLicenseArgsType = {
  licenseType: LicenseType;
};

export type GenerateKnoxConfigureTrialLicenseResponseType = {
  licenses: GenerateKnoxConfigureTrialLicenseType[];
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
export type GenerateKnoxConfigureTrialLicenseType = {
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
  status: LicenseStatus;
  tasks: KCLicenseTask[];
  total: number;
  type: LicenseType;
  updateTime: number;
  usageType: UsageType;
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
  status: TaskStatus;
  type: TaskType;
};
