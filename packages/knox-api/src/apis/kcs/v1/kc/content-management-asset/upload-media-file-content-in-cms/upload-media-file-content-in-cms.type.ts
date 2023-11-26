/**
 * Represents the status response schema for an upload content operation.
 * @property {string} file - Path and filename of the asset file (for example, *.txt, *.png, *.pdf, *.ogg).
 */
export type KCUploadMediaFileContentInCmsArgs = {
  file: string;
};

/**
 * Represents the status response schema for an upload content operation.
 * @property {string} code - Code that indicates the status of the upload content operation.
 * @property {string} contentId - Unique ID of the content.
 * @property {number} contentSize - Size of the file in bytes.
 * @property {string} fileName - Name of the file.
 * @property {string} href - This field is currently not used.
 * @property {string} message - Description of the status of the upload content operation.
 */
export type KCUploadMediaFileContentInCmsResponse = {
  code: string;
  contentId: string;
  contentSize: number;
  fileName: string;
  href: string;
  message: string;
};
