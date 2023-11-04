/**
 * Represents the structure of the query parameters for an API call that requires profile IDs.
 * @property {string[]} profileIds - List of IDs of profiles to be deleted.
 */
export type KCDeleteProfileArgs = {
  profileIds: string[];
};

/**
 * Represents the response schema for a JSON response.
 * @property {number} code - Error code number. If unique to Knox Configure, it's a more specific indicator of the error than the HTTP response code.
 * @property {boolean} data - Description of the error, intended to help developers debug the error response.
 * @property {string} message - Name of the error code.
 */
export type KCDeleteProfileResponse = {
  code: number;
  data: boolean;
  message: string;
};
