/**
 * OAuth 2.0 scopes supported by Knox cloud service APIs.
 *
 * @remarks
 * | Scope name | Description |
 * | --- | --- |
 * | `tag` | Manage all functionality related to common tags across Knox cloud services. |
 * | `tag.tags:view` | View common tags across Knox cloud services. |
 * | `tag.tags:manage` | Create, update, delete, and assign common tags to devices across Knox cloud services. |
 * | `kai` | Manage all Knox Asset Intelligence functionality, including devices, diagnostics logs, and network settings. |
 * | `kai.settings` | View and configure Knox Asset Intelligence tenant information, including battery thresholds and enrollment settings. |
 * | `kai.devices` | View Knox Asset Intelligence device and group information. |
 * | `kai.diagnostics` | Request and view Knox Asset Intelligence diagnostics logs. |
 * | `kai.network` | Subscribe to Knox Asset Intelligence Wi-Fi connection and disconnection events. |
 * | `kai.battery` | Subscribe to Knox Asset Intelligence battery-related events. |
 * | `kai.app` | Subscribe to Knox Asset Intelligence app usage and abnormal app events. |
 * | `kai.miscellaneous` | View the deployment status of Knox Service Plugin policies. |
 * | `kc` | Manage all Knox Configure functionality. |
 * | `kc.devices` | Manage all functionality related to Knox Configure devices. |
 * | `kc.devices:view` | View Knox Configure devices and their information. |
 * | `kc.devices:manage` | Send commands to devices and delete them from Knox Configure. |
 * | `kc.profile` | Manage all functionality related to Knox Configure profiles. |
 * | `kc.profile:view` | View Knox Configure profiles and profile information. |
 * | `kc.profile:manage` | Create and delete Knox Configure profiles. |
 * | `kc.profile:assign` | Assign and unassign Knox Configure profiles in bulk. |
 * | `kc.license` | Manage all functionality related to Knox Configure licenses. |
 * | `kc.license:view` | View Knox Configure licenses and license information. |
 * | `kc.license:manage` | Create, update, and delete Knox Configure licenses. |
 * | `kdp` | Manage all Knox Deployment Program functionality. |
 * | `kdp.devices` | Manage all Knox Deployment Program functionality related to devices. |
 * | `kdp.devices:view` | View devices and device statuses. |
 * | `kdp.devices:manage` | Upload and delete devices. |
 * | `kdp.profilealias` | View all Knox Mobile Enrollment profile aliases. |
 * | `kdp.customers` | View all Knox Deployment Program customers. |
 * | `ke` | Manage all Knox E-FOTA functionality. |
 * | `ke.campaign` | View, assign, create, delete, and cancel Knox E-FOTA campaigns. |
 * | `ke.campaign:view` | View Knox E-FOTA campaign information. |
 * | `ke.campaign:assign` | Assign or unassign devices from Knox E-FOTA campaigns. |
 * | `ke.campaign:manage` | Create and edit Knox E-FOTA campaigns. |
 * | `ke.campaign:delete` | Delete and cancel Knox E-FOTA campaigns. |
 * | `ke.devices` | View, upload, manage, and delete Knox E-FOTA devices. |
 * | `ke.devices:view` | View Knox E-FOTA device information. |
 * | `ke.devices:manage` | Upload, refresh, and unenroll Knox E-FOTA devices. |
 * | `ke.devices:delete` | Delete Knox E-FOTA devices. |
 * | `ke.licenses` | View, register, and delete Knox E-FOTA licenses. |
 * | `ke.licenses:view` | View Knox E-FOTA license information. |
 * | `ke.licenses:manage` | Register commercial licenses and generate trial licenses for Knox E-FOTA. |
 * | `ke.licenses:delete` | Delete Knox E-FOTA licenses. |
 * | `ke.fota:view` | View Knox E-FOTA firmware information. |
 * | `ke.privacyPolicy` | View and manage the Knox E-FOTA skip privacy policy setting. |
 * | `ke.privacyPolicy:view` | View the Knox E-FOTA skip privacy policy setting. |
 * | `ke.privacyPolicy:manage` | Manage the Knox E-FOTA skip privacy policy setting. |
 * | `km` | Manage all Knox Manage functionality. Available only to MSP partners. |
 * | `km.group` | View and create Knox Manage groups, and add users to groups. |
 * | `km.group:view` | View Knox Manage groups and their information. |
 * | `km.group:manage` | Update Knox Manage groups and their information. |
 * | `km.user` | View and create Knox Manage users, and request enrollment through email. |
 * | `km.user:view` | View Knox Manage users. |
 * | `km.user:manage` | Create Knox Manage users and request enrollment through email. |
 * | `km.profile` | Assign Knox Manage profiles to groups. |
 * | `kme` | Manage all Knox Mobile Enrollment functionality, including profiles, devices, and resellers. |
 * | `kme.profiles` | Manage all functionality related to Knox Mobile Enrollment profiles. |
 * | `kme.profiles:view` | View Knox Mobile Enrollment profiles. |
 * | `kme.profiles:manage` | Create, update, and delete Knox Mobile Enrollment profiles. |
 * | `kme.devices` | Manage all functionality related to Knox Mobile Enrollment devices. |
 * | `kme.devices:view` | View Knox Mobile Enrollment device information. |
 * | `kme.devices:manage` | Assign, unassign, and delete profiles, and approve device uploads. |
 * | `kme.reseller` | Manage all functionality related to Knox Mobile Enrollment resellers. |
 * | `msp` | Manage all Knox MSP Portal functionality. |
 * | `msp.customers` | Add and delink MSP customers, and view and edit their information. |
 * | `msp.profiles` | Copy existing profiles to managed customers. |
 * | `email` | Use an email address to verify the user's identity. |
 * | `openid` | Use a Samsung Knox user identifier. |
 *
 * Source: https://docs.samsungknox.com/dev/knox-cloud-authentication/knox-oauth-2-0-authentication/scopes-for-knox-cloud-services-apis/
 * Last synchronized: 2026-06-17
 */
export const KNOX_OAUTH_SCOPES = [
  // Common APIs — Tag API
  'tag',
  'tag.tags:view',
  'tag.tags:manage',

  // Knox Asset Intelligence
  'kai',
  'kai.settings',
  'kai.devices',
  'kai.diagnostics',
  'kai.network',
  'kai.battery',
  'kai.app',
  'kai.miscellaneous',

  // Knox Configure
  'kc',
  'kc.devices',
  'kc.devices:view',
  'kc.devices:manage',
  'kc.profile',
  'kc.profile:view',
  'kc.profile:manage',
  'kc.profile:assign',
  'kc.license',
  'kc.license:view',
  'kc.license:manage',

  // Knox Deployment Program
  'kdp',
  'kdp.devices',
  'kdp.devices:view',
  'kdp.devices:manage',
  'kdp.profilealias',
  'kdp.customers',

  // Knox E-FOTA
  'ke',
  'ke.campaign',
  'ke.campaign:view',
  'ke.campaign:assign',
  'ke.campaign:manage',
  'ke.campaign:delete',
  'ke.devices',
  'ke.devices:view',
  'ke.devices:manage',
  'ke.devices:delete',
  'ke.licenses',
  'ke.licenses:view',
  'ke.licenses:manage',
  'ke.licenses:delete',
  'ke.fota:view',
  'ke.privacyPolicy',
  'ke.privacyPolicy:view',
  'ke.privacyPolicy:manage',

  // Knox Manage — MSP partners only
  'km',
  'km.group',
  'km.group:view',
  'km.group:manage',
  'km.user',
  'km.user:view',
  'km.user:manage',
  'km.profile',

  // Knox Mobile Enrollment
  'kme',
  'kme.profiles',
  'kme.profiles:view',
  'kme.profiles:manage',
  'kme.devices',
  'kme.devices:view',
  'kme.devices:manage',
  'kme.reseller',

  // Knox MSP Portal
  'msp',
  'msp.customers',
  'msp.profiles',

  // Knox OAuth 2.0 authorization server operations
  'email',
  'openid',
] as const;

export type KnoxOAuthScope = (typeof KNOX_OAUTH_SCOPES)[number];

export type KnoxOAuthScopeInput = KnoxOAuthScope | readonly [KnoxOAuthScope, ...KnoxOAuthScope[]];
