/** Application/content references in profiles are int64, unlike profile IDs. */
export type ProfileApplicationId = number;
export type ProfileContentId = number;
export type ProfileType = 'Setup' | 'Dynamic';
export type DeviceLevel = 'Knox' | 'Other';
export type DeviceProductType = 'Phone' | 'Tablet' | 'Wearable' | 'Others';

export type AdditionalEula = {
  readonly termsAndConditions: string;
  readonly title: string;
  readonly type?: 'Enrollment' | 'AdminPortal' | 'UpdateEula' | 'SpecialPermission';
};

export type CustomerSupport = {
  readonly city?: string;
  readonly companyName?: string;
  readonly country?: string;
  readonly mailingAddress1?: string;
  readonly mailingAddress2?: string;
  readonly province?: string;
  readonly supportEmailAddress?: string;
  readonly supportPhoneNumber?: string;
  readonly zipCode?: string;
  readonly websiteAddress?: string;
};

export type FolderConfig = {
  readonly googlePlayFolderConfig?: {
    readonly folderName?: string;
    readonly page?: number;
    readonly x?: number;
    readonly y?: number;
  };
  readonly resolutionConfig?: {
    readonly columnCount?: number;
    readonly rowCount?: number;
    readonly pageCount?: number;
  };
};

export type ProfileImage = {
  readonly contentId?: ProfileContentId;
  readonly fileName?: string;
  readonly size?: number;
};

export type WelcomeScreenConfig = {
  readonly alignmentType?: 'Top' | 'Center' | 'Bottom';
  readonly backgroundSetting?: {
    readonly images?: readonly ProfileImage[];
    readonly brandingType?: 'Image' | 'Color';
    readonly content?: string;
  };
  readonly foregroundSetting?: { readonly content?: string; readonly fileName?: string };
  readonly hasCustomText: boolean;
  readonly hideSupportLink?: boolean;
  readonly textBody?: string;
};

export type ProductInfoScreen = {
  readonly name?: string;
  readonly nonDismissibleNotification?: {
    readonly appName?: string;
    readonly notificationMessage?: string;
  };
};

export type LockScreenHiddenWidgets = {
  readonly hideTimeWidget?: boolean;
  readonly hideDateWidget?: boolean;
  readonly hideOwnerInfoWidget?: boolean;
  readonly hideHelpTextWidget?: boolean;
  readonly hideBatteryInfoWidget?: boolean;
  readonly hideShortcutsWidget?: boolean;
  readonly hideDefaultAndroidWidgets?: boolean;
};

export type QRCodeEnrollment = {
  readonly allowQRCodeNotUploadedByReseller?: boolean;
  readonly clType?: string;
  readonly countryISO?: 'US' | 'EU' | 'CN' | 'ALL';
  readonly hasWifiNetworkConfig?: boolean;
  readonly qrCodeBase64?: string;
  readonly qrCodeCreateTime?: number;
  readonly qrCodeForEnrollmentLink?: string;
  readonly qrCodeModifiedTime?: number;
  readonly skipMacRandomization?: boolean;
  readonly ssidName?: string;
  readonly wifiProxyDetails?: {
    readonly wifiProxy?: 'None' | 'Manual' | 'AutoConfigure';
    readonly wifiProxyAutoConfigDetails?: { readonly pacWebAddress?: string };
    readonly wifiProxyManualDetails?: {
      readonly bypassProxy?: string;
      readonly hostName?: string;
      readonly authenticatedServer?: boolean;
      readonly port?: number;
      readonly userToken?: string;
      readonly username?: string;
    };
  };
  readonly wifiSecurityDetails?: {
    readonly security?: 'NONE' | 'WEP' | 'WPA' | 'WPA_WPA2';
    readonly securityToken?: string;
  };
};
