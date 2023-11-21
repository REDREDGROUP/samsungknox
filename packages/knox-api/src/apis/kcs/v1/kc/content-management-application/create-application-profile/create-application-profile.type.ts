/**
 * Additional end-user license agreement (EULA).
 * @property {string} termsAndConditions - The terms and conditions of the EULA to be added.
 * @property {string} title - Title of the EULA to be added.
 * @property {EulaType} type - Type of EULA. Can be 'enrollment', 'adminPortal', 'updateEula', 'specialPermission'.
 * @property {number[]} applicationIds - List of unique content IDs of the applications to be included in the profile.
 * @property {CCCustomerSupport} customerSupport - Contains the company and customer support details of the profile.
 * @property {string} description - Description of the profile to be created. Appears on enrollment.
 * @property {DeviceLevel} deviceLevel - Identifies whether the device is a Knox device. Default: Knox.
 * @property {EnrollmentPreference} enrollmentPreference - Settings used when enrolling in the profile.
 * @property {KCAddFolderRequest} folderConfig - Set up the Google Play folder.
 * @property {string} kdaDefaultLicenseKey - Default license key for the profile.
 * @property {string} knoxVersion - Knox version of the profile to be created. Default: 2.9.
 * @property {string} name - Name of the profile to be created. Appears on enrollment.
 * @property {KCAddWelcomeScreenConfig} welcomeScreenConfig - Branding customization for the background and logo.
 */
export type KCCreateApplicationProfileArgs = {
  // termsAndConditions: string;
  // title: string;
  // type: EulaType;
  applicationIds?: number[];
  customerSupport: CCCustomerSupport;
  description?: string;
  deviceLevel?: DeviceLevel;
  enrollmentPreference?: EnrollmentPreference;
  folderConfig?: KCAddFolderRequest;
  kdaDefaultLicenseKey?: string;
  knoxVersion?: string;
  name: string;
  welcomeScreenConfig?: KCAddWelcomeScreenConfig;
};

/**
 * Enumeration of EULA types.
 */
export type EulaType = 'enrollment' | 'adminPortal' | 'updateEula' | 'specialPermission';

/**
 * Company and customer support details of the profile.
 * @property {string} city - City that appears during enrollment.
 * @property {string} companyName - Company name that appears during enrollment.
 * @property {string} country - Country that appears during enrollment.
 * @property {string} mailingAddress1 - Address line 1 of the company's location.
 * @property {string} mailingAddress2 - Address line 2 of the company's location.
 * @property {string} province - Province that appears during enrollment.
 * @property {string} supportEmailAddress - Email address for customer support.
 * @property {string} supportPhoneNumber - Phone number for customer support.
 * @property {string} zipCode - Zip code that appears during enrollment.
 */
export type CCCustomerSupport = {
  city?: string;
  companyName?: string;
  country?: string;
  mailingAddress1?: string;
  mailingAddress2?: string;
  province?: string;
  supportEmailAddress?: string;
  supportPhoneNumber?: string;
  zipCode?: string;
};

/**
 * Google Play folder configuration.
 * @property {GooglePlayFolder} googlePlayFolderConfiguration - Defines how the Google Play shortcuts folder will appear.
 * @property {Resolution} resolutionConfiguration - Defines the row and column resolution of the shortcuts folder screen.
 */
export type KCAddFolderRequest = {
  googlePlayFolderConfiguration: GooglePlayFolder;
  resolutionConfiguration: Resolution;
};

/**
 * Google Play shortcuts folder details.
 * @property {string} folderName - Name of the Google Play shortcuts folder.
 * @property {number} page - Page of the shortcuts screen where the folder will be placed.
 * @property {number} x - Column where the shortcuts folder will be placed.
 * @property {number} y - Row where the shortcuts folder will be placed.
 */
export type GooglePlayFolder = {
  folderName: string;
  page: number;
  x: number;
  y: number;
};

/**
 * Resolution configuration for the shortcuts folder screen.
 * @property {number} columnCount - Number of columns in each page.
 * @property {number} pageCount - Number of pages.
 * @property {number} rowCount - Number of rows in each page.
 */
export type Resolution = {
  columnCount: number;
  pageCount: number;
  rowCount: number;
};

/**
 * Branding customization for the background and logo.
 * @property {KCBrandingSetting} backGroundSetting - Branding for the background.
 * @property {KCBrandingSetting} foreGroundSetting - Branding for the foreground.
 * @property {boolean} hasCustomText - Indicates if there is custom text in the enrollment screen.
 * @property {boolean} hideSupportLink - Indicates if the support link should be hidden.
 * @property {string} textBody - Custom text for the enrollment screen.
 */
export type KCAddWelcomeScreenConfig = {
  backGroundSetting: KCBrandingSetting;
  foreGroundSetting: KCBrandingSetting;
  hasCustomText: boolean;
  hideSupportLink?: boolean;
  textBody?: string;
};

/**
 * Branding setting details.
 * @property {BrandingType} brandingType - Type of branding, either 'IMAGE' or 'COLOR'.
 * @property {string} content - Hex code of the color or contentId of the uploaded image.
 * @property {string} fileName - Path and filename of the image.
 */
export type KCBrandingSetting = {
  brandingType: BrandingType;
  content: string;
  fileName?: string;
};

/**
 * Enumeration of branding types.
 */
export type BrandingType = 'IMAGE' | 'COLOR';

/**
 * Enumeration of device levels.
 */
export type DeviceLevel = 'Knox' | 'Other';

/**
 * Enumeration of enrollment preferences.
 */
export type EnrollmentPreference = 'DO_NOT_ALLOW' | 'ALLOW_USER_CANCEL' | 'ALLOW_SKIP_SETUP_WIZARD';
