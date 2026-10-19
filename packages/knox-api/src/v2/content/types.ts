/** Allowed server content: .jpg, .jpeg, .png, at most 50 MB. */
export type UploadContentFilesArgs = {
  readonly file: Blob;
  readonly filename?: string;
};

export type UploadContentFilesResponse = {
  readonly contentId?: string;
  readonly contentSize?: number;
};

export type GenerateContentDownloadUrlArgs = {
  readonly contentId: string;
};

export type GenerateContentDownloadUrlResponse = {
  readonly downloadUrl?: string;
};

export type DeleteContentFilesArgs = {
  readonly contentIds: readonly string[];
};

export type DeleteContentFilesResponse = {
  readonly failedContentIds?: readonly string[];
};
