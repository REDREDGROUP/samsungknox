/**
 * Get media content using a content ID.
 * @property {string} contentId - ID of the uploaded media.
 */
export type KCGetMediaFileArgs = {
  contentId: string;
};

/**
 * Get media content using a content ID. (Response)
 * @property {string} downloadUrl - ID of the uploaded media.
 */
export type KCGetMediaFileResponse = {
  downloadUrl: string;
};
