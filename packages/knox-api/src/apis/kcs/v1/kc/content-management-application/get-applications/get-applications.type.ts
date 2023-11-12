/**
 * Represents the search parameters for fetching app details.
 * @property {string} appIds - Comma-separated list of IDs of apps to be retrieved.
 * @property {string} externalIds - Comma-separated list of external IDs of apps to be retrieved.
 * @property {string} search - Search string that allows searching by name.
 * @property {string} platform - Operating system the app runs on. Possible values: "ANDROID", "TIZEN".
 * @property {string} source - Source of the application. Possible values: "IN_HOUSE", "GOOGLE_PLAY_STORE", "GALAXY_APP_STORE".
 * @property {string} packageName - Package name of the app to be retrieved.
 * @property {boolean} isWatchFaceApp - Filter for watch face apps. This field is used if the platform is TIZEN. Default: false.
 * @property {string} sortBy - Field to sort by. Possible values: "createTime", "updateTime", "packageVersion".
 * @property {string} sortOrder - Order by which results should be sorted. Possible values: "ascending", "descending". Default: "descending".
 * @property {number} pageNum - The number of the page to be fetched. Default: 0. Values less than 0 will default to 0.
 * @property {number} pageSize - Maximum number of records to be fetched in a call. Default: 100. Values less than 0 will default to 100.
 */
export type KCGetApplicationsArgs = {
  appIds?: string;
  externalIds?: string;
  search?: string;
  platform?: 'ANDROID' | 'TIZEN';
  source?: 'IN_HOUSE' | 'GOOGLE_PLAY_STORE' | 'GALAXY_APP_STORE';
  packageName?: string;
  isWatchFaceApp?: boolean;
  sortBy?: 'createTime' | 'updateTime' | 'packageVersion';
  sortOrder?: 'ascending' | 'descending';
  pageNum?: number;
  pageSize?: number;
};

/**
 * Custom properties associated with the app.
 * @property {string} key - Key of the custom property.
 * @property {string} value - Value of the custom property.
 */
type KCApplicationCustomProperty = {
  key: string;
  value: string;
};

/**
 * Represents error details.
 * @property {number} code - Error code number.
 * @property {string} message - Error message.
 */
type Error = {
  code: number;
  message: string;
};

/**
 * Details about a widget associated with an app.
 * @property {string} category - Category of the widget.
 * @property {string} fileIdentifier - Identifier of the file.
 * @property {string} minHeight - Default height of the widget.
 * @property {string} minResizeHeight - Widget's minimum height after resizing.
 * @property {string} minResizeWidth - Widget's minimum width after resizing.
 * @property {string} minWidth - Default width of the widget.
 * @property {string} name - Name of the widget.
 * @property {string} resizeMode - Resize mode of the widget.
 * @property {string} type - Type of the widget.
 * @property {number} widgetId - Identifier of the widget.
 * @property {string} packageName - Name of the app.
 * @property {string} platform - Operating system the app runs on.
 * @property {string} signature - APK signature.
 * @property {string} source - Source of the app.
 * @property {number} updateTime - Time the app was updated in epoch format.
 */
type KCApplicationWidget = {
  category: string;
  fileIdentifier: string;
  minHeight: string;
  minResizeHeight: string;
  minResizeWidth: string;
  minWidth: string;
  name: string;
  resizeMode: string;
  type: string;
  widgetId: number;
};

/**
 * Contains detailed information about an application.
 * @property {string} checksum - MD5 checksum of the APK.
 * @property {string} clientDownloadUrl - URL for downloading the application from a device.
 * @property {number} createTime - Time the app was created in epoch format.
 * @property {string} creator - Email address of the IT admin that uploaded the app.
 * @property {KCApplicationCustomProperty[]} customProperties - Custom properties associated with the app.
 * @property {string} description - Description of the app.
 * @property {string} downloadUrl - URL for downloading the application.
 * @property {Error} error - Object containing error information.
 * @property {string} externalId - External ID of the app.
 * @property {string} modifier - Email address of the IT admin that last uploaded the app.
 * @property {string} name - Name of the app.
 * @property {string} packageVersion - Version of the package.
 * @property {number} size - Size of the APK or TPK in bytes.
 * @property {string} status - Status of the app.
 * @property {string} thumbnailUrl - URL for downloading the thumbnail.
 * @property {number} updateTime - Time the app was updated in epoch format.
 * @property {number} versionCode - Numeric version code of the application.
 * @property {string} versionName - Version name of the application.
 * @property {KCApplicationWidget[]} widgets - Array of widgets associated with the app.
 */
export type KCApplicationAppInfo = {
  checksum: string;
  clientDownloadUrl: string;
  createTime: number;
  creator: string;
  customProperties: KCApplicationCustomProperty[];
  description: string;
  downloadUrl: string;
  error: Error;
  externalId: string;
  modifier: string;
  name: string;
  packageVersion: string;
  size: number;
  status: string;
  thumbnailUrl: string;
  updateTime: number;
  versionCode: number;
  versionName: string;
  widgets: KCApplicationWidget[];
};

/**
 * Represents the details of an application, including checksum, download URLs, creation and update times,
 * custom properties, error information, and associated widgets.
 * @property {string} checksum - MD5 checksum of the APK.
 * @property {string} clientDownloadUrl - URL for downloading the application from a device.
 * @property {number} createTime - Time the app was created, in epoch format.
 * @property {string} creator - Email address of the IT admin that uploaded the app.
 * @property {KCApplicationCustomProperty[]} customProperties - Custom properties associated with the app.
 * @property {string} description - Description of the app.
 * @property {string} downloadUrl - URL for downloading the application.
 * @property {Error} error - Error information associated with the app.
 * @property {string} externalId - External ID of the app.
 * @property {string} modifier - Email address of the IT admin that last uploaded the app.
 * @property {string} name - Name of the app.
 * @property {string} packageVersion - Version of the package for APKs and GALAXY_APP_STORE.
 * @property {number} size - Size of the APK or TPK in bytes.
 * @property {Status} status - Status of the app, can be "SIGNING_IN_PROGRESS", "SIGNING_FAILED", or "DEPLOYABLE".
 * @property {string} thumbnailUrl - URL for downloading the thumbnail.
 * @property {number} updateTime - Time the app was updated, in epoch format.
 * @property {number} versionCode - Code of the application version.
 * @property {string} versionName - Name of the application version, used for TPK uploads (Tizen IN_HOUSE).
 * @property {KCApplicationWidget[]} widgets - Array of widgets associated with the app.
 */
type KCApplicationLatestVersion = {
  checksum: string;
  clientDownloadUrl: string;
  createTime: number;
  creator: string;
  customProperties: KCApplicationCustomProperty[];
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
  widgets: KCApplicationWidget[];
};

/**
 * Represents the response schema for a JSON response containing application information.
 * @property {number} totalCount - Total count.
 */
export type KCGetApplicationResponse = {
  applications: KCApplication[];
  totalCount: number;
};

/**
 * Represents an individual application entity.
 * @property {AppInfo[]} appInfo - Array of objects containing information about the application.
 * @property {string} applicationCsdk - License used by the APK.
 * @property {number} createTime - Time the app was created. Format: epoch.
 * @property {string} creator - Email address of the IT admin that uploaded the app.
 * @property {string} customerId - Knox Customer ID.
 * @property {string} id - Identifier of the app.
 * @property {latestVersion} latestVersion - Details of the latest version of the uploaded app.
 * @property {string} modifier - Email address of the IT admin that last uploaded the app.
 * @property {string} platform - Operating system the app runs on
 * @property {string} signature - APK signature
 * @property {string} source
 * @property {number} updateTime
 */
type KCApplication = {
  appInfo: KCApplicationAppInfo[];
  applicationCsdk: string;
  createTime: number;
  creator: string;
  customerId: string;
  id: string;
  latestVersion: KCApplicationLatestVersion;
  modifier: string;
  platform: 'ANDROID' | 'TIZEN';
  signature: string;
  source: 'GOOGLE_PLAY_STORE' | 'GALAXY_APP_STORE';
  updateTime: number;
};
