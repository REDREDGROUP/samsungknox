export type ApplicationSource = 'InHouse' | 'GooglePlayStore';
export type ApplicationStatus = 'InProgress' | 'Deployable' | 'Failed';

export type GetApplicationsArgs = {
  readonly applicationIds?: readonly string[];
  readonly name?: string;
  readonly source?: ApplicationSource;
  readonly packageName?: string;
  readonly sortBy?: 'createTime' | 'updateTime' | 'packageVersion';
  readonly sortOrder?: 'ascending' | 'descending';
  readonly pageNum?: number;
  readonly pageSize?: number;
};

export type ApplicationVersion = {
  readonly applicationId?: string;
  readonly packageVersion?: string;
  readonly createTime?: number;
  readonly updateTime?: number;
};

export type Application = {
  readonly versions?: readonly ApplicationVersion[];
  readonly packageName?: string;
  readonly latestPackageVersion?: string;
  readonly source?: ApplicationSource;
};

export type GetApplicationsResponse = {
  readonly applications?: readonly Application[];
  readonly totalCount?: number;
};

/** The operation's oneOf requires an application ID or package name, not both. */
export type GetAppDetailsArgs = { readonly applicationId: string; readonly packageName?: never } | { readonly packageName: string; readonly applicationId?: never };

export type ApplicationVersionDetails = ApplicationVersion & {
  readonly name?: string;
  readonly description?: string;
  readonly size?: number;
  readonly checksum?: string;
  readonly status?: ApplicationStatus;
  readonly thumbnailUrl?: string;
};

export type GetAppDetailsResponse = {
  readonly versions?: readonly ApplicationVersionDetails[];
  readonly packageName?: string;
  readonly latestPackageVersion?: string;
  readonly applicationCsdk?: string;
  readonly source?: ApplicationSource;
};

export type GooglePlayApplication = {
  readonly description?: string;
  readonly url?: string;
};

export type UploadPublicApplicationArgs = {
  readonly apps: readonly GooglePlayApplication[];
};

export type UploadPublicApplicationResponse = {
  readonly errorResponse?: readonly {
    readonly error?: { readonly code?: number; readonly message?: string };
    readonly url?: string;
  }[];
  readonly successResponse?: readonly {
    readonly applicationId?: string;
    readonly url?: string;
  }[];
};

/** A File preserves its name; filename can name a Blob explicitly. */
export type UploadInHouseApplicationArgs = {
  readonly file: Blob;
  readonly filename?: string;
  readonly description?: string;
};

export type UploadInHouseApplicationResponse = {
  readonly applicationId?: string;
  readonly status?: ApplicationStatus;
};

/** IDs can optionally be restricted to a package; a package alone is also valid. */
export type DeleteApplicationsArgs =
  | { readonly applicationIds: readonly string[]; readonly packageName?: string }
  | { readonly packageName: string; readonly applicationIds?: readonly string[] };

export type DeleteApplicationsResponse = {
  readonly failedApplicationIds?: readonly string[];
};

export type GenerateAppDownloadUrlArgs = {
  readonly applicationId: string;
};

export type GenerateAppDownloadUrlResponse = {
  readonly downloadUrl?: string;
};
