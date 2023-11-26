/**
 * Delete an application's versions Response
 * @property {number} failedCount - Number of app versions not deleted.
 * @property {number} notificationId - ID of the notification.
 * @property {number} successCount - Number of app versions deleted.
 * @property {number} totalCount - Number of external IDs in the delete request.
 */
export type KCDeleteApplicationVersionsResponse = {
  failedCount: number;
  notificationId: number;
  successCount: number;
  totalCount: number;
};

/**
 * Delete an application's versions Args
 * @property {string} applicationId - ID of the application. This can be retrieved by calling kcGetApplications.
 * @property {string} externalIds - Comma-separated list of app versions to be deleted. If this is empty, the whole app defined by applicationId will be deleted. Do not pass any value if the app only has one version.
 */
export type KCDeleteApplicationVersionsArgs = {
  applicationId: string;
  externalIds?: string;
};
