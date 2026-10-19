import type { DeviceDetails } from './details';

/** Current v2 identifiers are IMEI/serial strings, not legacy device objects. */
export type DeviceId = string;
export type ProfileId = string;
export type SortOrder = 'ascending' | 'descending';
export type DeviceState =
  | 'ProfileAssigned'
  | 'Configured'
  | 'FailedToConfigure'
  | 'Error'
  | 'CancelledByUser'
  | 'Failed'
  | 'Unassigned'
  | 'UpdatesPushed'
  | 'Pending'
  | 'InProgress'
  | 'Locked'
  | 'DeactivatedTemporarily'
  | 'Exchanging';

/** OpenAPI deliberately leaves cursor object contents unspecified; keep JSON intact. */
export type CursorValue = string | number | boolean | null | readonly CursorValue[] | { readonly [key: string]: CursorValue };
export type DeviceCursor = readonly { readonly [key: string]: CursorValue }[];

export type GetDevicesRequest = {
  readonly deviceIds?: readonly DeviceId[];
  readonly profileIds?: readonly ProfileId[];
  readonly deviceState?: readonly DeviceState[];
  /** Default 25; documented range 1-100. */
  readonly pageSize?: number;
  readonly sortBy?: 'updateTime' | 'serviceEndDate' | 'lastSeenTime';
  readonly sortOrder?: SortOrder;
} & ({ readonly pageNum?: number; readonly searchAfter?: never } | { readonly pageNum?: never; readonly searchAfter?: DeviceCursor | null });

/** Response properties follow OpenAPI requiredness (none are marked required). */
export type GetDevicesResponse = {
  readonly devices?: readonly DeviceDetails[];
  readonly totalCount?: number;
  readonly nextSearchAfter?: DeviceCursor | null;
};

export type GetDeviceLogsRequest = {
  readonly deviceId: DeviceId;
  readonly oldImeiSn?: string;
  readonly pageNum?: number;
  readonly pageSize?: number;
};

export type DeviceWarning = {
  readonly code?: string;
  readonly packages?: readonly string[];
  readonly reason?: string;
};

export type DeviceLog = {
  readonly errorCode?: string;
  readonly lockPassCode?: string;
  readonly message?: string;
  readonly reason?: string;
  readonly state?: string;
  readonly updateTime?: number;
  readonly warnings?: readonly DeviceWarning[];
};

export type GetDeviceLogsResponse = {
  readonly deviceId?: DeviceId;
  readonly deviceLogs?: readonly DeviceLog[];
  readonly totalCount?: number;
};

export type BulkDeleteDevicesRequest = {
  readonly deviceIds: readonly DeviceId[];
};

export type SendCommandRequest = {
  readonly command: 'REBOOT' | 'FACTORY RESET';
  readonly deviceIds: readonly DeviceId[];
};

/** The service's actual common response, including diagnostic data, is returned directly. */
export type CommonResponse = {
  readonly code?: number;
  readonly message?: string;
  readonly data?: string;
};
