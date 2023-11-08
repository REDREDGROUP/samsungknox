/**
 * Represents the structure of the query parameters for an API call that requires device ID.
 * @property {string} profileId- IMEI or serial number of the device.
 */
export type KCGetDeviceLogsArgs = {
  deviceId: string;
};

type Warning = {
  api: string; // API that triggered the warning.
  code: string; // Error or warning code the device returned.
  packages: string[]; // Packages that triggered the warning.
  reason: string; // Reason for the failure or warning.
};

type CCDeviceLogResponse = {
  errorCode: string; // Code identifying an error that occurred on the device.
  lockPassCode?: string; // Optional. Pin that was applied to the device to unlock it.
  message: string; // Name of the error code.
  reason: string; // Description of the error, intended to help developers to debug the error response.
  state: string; // Status of the device.
  updateTime: number; // Date and time of the logged event. Format: epoch.
  warnings?: Warning[]; // Optional. Array of warnings related to the device.
};

export type KCGetDeviceLogsResponse = {
  deviceId: string; // Unique identifier for the device.
  deviceLogs: CCDeviceLogResponse[]; // Array of device log responses.
  totalCount?: number;
};
