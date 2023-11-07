/** Wi-Fi security */
export type BaseKCProfileWifiSecurity = 'NONE' | 'WEP' | 'WPA' | 'WPA_WPA2';

/** Wi-Fi proxy settings */
export type BaseKCProfileWifiProxySetting = 'NONE' | 'MANUAL' | 'AUTO_CONFIGURE';

/** device level */
export type BaseKCProfileDeviceLevel = 'Knox' | 'Other';

/** profile type */
export type BaseKCProfileType = 'basic' | 'advanced';

export type BaseKCProfileCountryISO = 'US' | 'EU' | 'CN' | 'ALL';
