/**
 * Represents the structure of the query parameters for an API call that requires device IDs.
 * @property {string[]} profileIds - IMEIs or serial numbers of devices the customer intends to unassign a profile from.
 */
export type KCUnassignProfileDevicesArgs = {
  deviceIds: string[];
};

/**
 * Represents the structure of the query parameters for an API call that requires device IDs.
 * @property {number} failedCount - Count of devices a profile could not be unassigned from.
 * @property {number} pendingCount - Count of devices that were successfully selected for profile unassignment
 * @property {number} successCount - Count of devices from which a profile was successfully unassigned
 * @property {number} totalCount - Total number of devices
 */
export type KCUnassignProfileDevicesResponse = {
  failedCount: number;
  pendingCount: number;
  successCount: number;
  totalCount: number;
};
