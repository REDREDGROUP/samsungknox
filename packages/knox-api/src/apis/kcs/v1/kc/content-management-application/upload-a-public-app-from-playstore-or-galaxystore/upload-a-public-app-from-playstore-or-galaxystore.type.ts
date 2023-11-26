/**
 * Represents the request schema for adding an application.
 * @property {AppRequest[]} appRequestList - Array of pairs consisting of a Google Play Store URL and a description.
 *        Each pair represents an app. Required if the source is GOOGLE_PLAY_STORE.
 * @property {string} applicationCsdk - License that will be used by the APK.
 * @property {CustomProperty[]} customProperties - Array of key-value pairs representing custom properties to be associated with the app.
 * @property {string} description - Description of the application.
 * @property {string} name - Placeholder name for the application. This can be different from the actual application name extracted from the binary.
 * @property {string} packageName - Name of the package. Required if source is GALAXY_APP_STORE.
 * @property {string} packageVersion - Version of the package. Required if source is GALAXY_APP_STORE.
 * @property {string} platform - Operating system the app runs on. Can be 'ANDROID' or 'TIZEN'.
 * @property {string} source - Source of the application. Can be 'GOOGLE_PLAY_STORE' or 'GALAXY_APP_STORE'.
 */
export type KCUploadAPublicFromPlayStoreOrGalaxyStoreAppArgs = {
  appRequestList?: AppRequest[];
  applicationCsdk?: string;
  customProperties?: CustomProperty[];
  description?: string;
  name: string;
  packageName?: string;
  packageVersion?: string;
  platform: 'ANDROID' | 'TIZEN';
  source: 'GOOGLE_PLAY_STORE' | 'GALAXY_APP_STORE';
};

/**
 * App request schema.
 * @property {string} description - Optional description of the app in GOOGLE_PLAY_STORE.
 * @property {string} url - URL of the app in GOOGLE_PLAY_STORE.
 */
type AppRequest = {
  description?: string;
  url: string;
};

/**
 * Represents the response schema for an app upload or update.
 * @property {string} appName - Application name. Returned if the uploaded APK or TPK is a new version of an existing app.
 * @property {ErrorResponse[]} errorResponse - Array of error responses, returned when source is GOOGLE_PLAY_STORE and an app failed to be created.
 * @property {string} newVersion - True if the uploaded app was added as a new version of an existing app.
 * @property {SuccessResponse[]} successResponse - Array of successful app entities.
 * @property {string} version - Version of the uploaded app. Returned when the uploaded APK or TPK is a new version of an existing app.
 */
export type KCUploadAPublicFromPlayStoreOrGalaxyStoreAppResponse = {
  appName: string;
  errorResponse: ErrorResponse[];
  newVersion: boolean;
  successResponse: SuccessResponse[];
  version: string;
};

/**
 * Error response schema.
 * @property {string} appId - ID of the app with an error.
 * @property {number} appSize - Size of the app with an error.
 * @property {string} appTitle - Title of the app with an error.
 * @property {string} bundleName - Bundle identifier of the app with an error.
 * @property {string} bundleVersion - Bundle version of the app with an error.
 * @property {string} description - Description of the app with an error.
 * @property {string} deviceAdminClass - Currently not used.
 * @property {Error} error - Error details.
 * @property {number} versionCode - Version code of the app.
 * @property {boolean} newVersion - True if the uploaded app is a new version of an existing app.
 */
type ErrorResponse = {
  appId: string;
  appSize: number;
  appTitle: string;
  bundleName: string;
  bundleVersion: string;
  description: string;
  deviceAdminClass: string;
  error: Error;
  versionCode: number;
  newVersion: boolean;
};

/**
 * Successful app entity schema.
 * @property {AppInfo[]} appInfo - Array of app information objects.
 * @property {string} applicationCsdk - License used by the APK.
 * @property {number} createTime - Time the app was created, in epoch format.
 * @property {string} creator - Email of the IT admin who uploaded the app.
 * @property {string} customerId - Knox Customer ID.
 * @property {string} id - Identifier of the app.
 * @property {LatestVersion} latestVersion - Details of the latest version of the uploaded app.
 * @property {string} modifier - Email of the IT admin who last modified the app.
 * @property {string} packageName - Name of the app
 * @property {string} platform - Operating system the app runs on.
 * @property {string} signature - APK signature.
 * @property {string} source - Source of the app.
 * @property {number} updateTime - Time the app was updated, in epoch format.
 */
type SuccessResponse = {
  appInfo: AppInfo[];
  applicationCsdk: string;
  createTime: number;
  creator: string;
  customerId: string;
  id: string;
  latestVersion: LatestVersion;
  modifier: string;
  packageName: string;
  platform: 'ANDROID' | 'TIZEN';
  signature: string;
  source: 'GOOGLE_PLAY_STORE' | 'GALAXY_APP_STORE';
  updateTime: number;
};

/**
 * App information schema.
 * @property {string} checksum - MD5 checksum of the APK.
 * @property {string} clientDownloadUrl - URL for downloading the app from a device.
 * @property {number} createTime - Time the app was created, in epoch format.
 * @property {string} creator - Email of the IT admin who uploaded the app.
 * @property {CustomProperty[]} customProperties - Array of custom properties associated with the app.
 * @property {string} description - Description of the app.
 * @property {string} downloadUrl - URL for downloading the app.
 * @property {Error} error - Error details.
 * @property {string} externalId - External ID of the app.
 * @property {string} modifier - Email of the IT admin who last modified the app.
 * @property {string} name - Name of the app.
 * @property {string} packageVersion - Version of the package for APKs.
 * @property {number} size - Size of the APK or TPK in bytes.
 * @property {string} status - Status of the app (e.g., 'SIGNING_IN_PROGRESS').
 * @property {string} thumbnailUrl - URL for the app thumbnail.
 * @property {number} updateTime - Time the app was updated, in epoch format.
 * @property {number} versionCode - Version code of the app.
 * @property {string} versionName - Version name of the app.
 */
type AppInfo = {
  checksum: string;
  clientDownloadUrl: string;
  createTime: number;
  creator: string;
  customProperties: CustomProperty[];
  description: string;
  downloadUrl: string;
  error: Error;
  externalId: string;
  modifier: string;
  name: string;
  packageVersion: string;
  size: number;
  status: 'SIGNING_IN_PROGRESS' | 'SIGNING_FAILED' | 'DEPLOYABLE';
  thumbnailUrl: string;
  updateTime: number;
  versionCode: number;
  versionName: string;
  widgets: Widget[];
};

/**
 * App information schema.
 * @property {string} checksum - MD5 checksum of the APK.
 * @property {string} clientDownloadUrl - URL for downloading the app from a device.
 * @property {number} createTime - Time the app was created, in epoch format.
 * @property {string} creator - Email of the IT admin who uploaded the app.
 * @property {CustomProperty[]} customProperties - Array of custom properties associated with the app.
 * @property {string} description - Description of the app.
 * @property {string} downloadUrl - URL for downloading the app.
 * @property {Error} error - Error details.
 * @property {string} externalId - External ID of the app.
 * @property {string} modifier - Email of the IT admin who last modified the app.
 * @property {string} name - Name of the app.
 * @property {string} packageVersion - Version of the package for APKs.
 * @property {number} size - Size of the APK or TPK in bytes.
 * @property {string} status - Status of the app (e.g., 'SIGNING_IN_PROGRESS').
 * @property {string} thumbnailUrl - URL for the app thumbnail.
 * @property {number} updateTime - Time the app was updated, in epoch format.
 * @property {number} versionCode - Version code of the app.
 * @property {string} versionName - Version name of the app.
 */
type LatestVersion = {
  checksum: string;
  clientDownloadUrl: string;
  createTime: number;
  creator: string;
  customProperties: CustomProperty[];
  description: string;
  downloadUrl: string;
  error: Error;
  externalId: string;
  modifier: string;
  name: string;
  packageVersion: string;
  size: number;
  status: 'SIGNING_IN_PROGRESS' | 'SIGNING_FAILED' | 'DEPLOYABLE';
  thumbnailUrl: string;
  updateTime: number;
  versionCode: number;
  versionName: string;
  widgets: Widget[];
};

/**
 * Custom property associated with an app.
 * @property {string} key - Key of the custom property.
 * @property {string} value - Value of the custom property.
 */
type CustomProperty = {
  key: string;
  value: string;
};

/**
 * Widget information schema.
 * @property {string} category - Category of the widget.
 * @property {string} fileIdentifier - Identifier of the widget file.
 * @property {string} minHeight - Default height of the widget.
 * @property {string} minResizeHeight - Minimum height of the widget after resizing.
 * @property {string} minResizeWidth - Minimum width of the widget after resizing.
 * @property {string} minWidth - Default width of the widget.
 * @property {string} name - Name of the widget.
 * @property {string} resizeMode - Resize mode of the widget ('RESIZE_NONE', 'RESIZE_HORIZONTAL', 'RESIZE_VERTICAL', 'RESIZE_BOTH').
 * @property {string} type - Type of the widget ('PreviewImage', 'WidgetIcon').
 * @property {number} widgetId - Identifier of the widget.
 */
type Widget = {
  category: string;
  fileIdentifier: string;
  minHeight: string;
  minResizeHeight: string;
  minResizeWidth: string;
  minWidth: string;
  name: string;
  resizeMode: 'RESIZE_NONE' | 'RESIZE_HORIZONTAL' | 'RESIZE_VERTICAL' | 'RESIZE_BOTH';
  type: 'PreviewImage' | 'WidgetIcon';
  widgetId: number;
};

/**
 * Error details.
 * @property {number} code - Error code.
 * @property {string} message - Error message.
 */
type Error = {
  code: number;
  message: string;
};
