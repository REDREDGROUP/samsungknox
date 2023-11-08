/**
 * Represents the request for sending a command to devices.
 * @property {string[]} command - Command to be sent to devices.
 * @property {string[]} devices - IMEIs or serial numbers of devices the command will be sent to.
 */
export type KCSendCommandToMultipleDeviceArgs = {
  command: 'REBOOT' | 'FACTORY_RESET';
  devices: string[];
};

/**
 * Represents the response schema for a JSON response.
 * @property {number} code - Error code number. If this is unique to Knox Configure, it is a more specific indicator of the error than the HTTP response code.
 * @property {boolean} data - Description of the error, intended to help developers debug the error response.
 * @property {string} message - Name of the error code.
 */
export type KCSendCommandToMultipleDeviceResponse = {
  code: number;
  data: boolean;
  message: string;
};
