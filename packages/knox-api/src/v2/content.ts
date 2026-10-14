import type { AxiosInstance } from 'axios';
import type {
  DeleteContentFilesArgs,
  DeleteContentFilesResponse,
  GenerateContentDownloadUrlArgs,
  GenerateContentDownloadUrlResponse,
  UploadContentFilesArgs,
  UploadContentFilesResponse,
} from './content/types';

export * from './content/types';

export function createContentApi(axios: AxiosInstance) {
  return {
    async uploadContentFiles(args: UploadContentFilesArgs): Promise<UploadContentFilesResponse> {
      const form = new FormData();
      if (args.filename === undefined) {
        form.append('file', args.file);
      } else {
        form.append('file', args.file, args.filename);
      }
      const response = await axios.post<UploadContentFilesResponse>('/kc/v2/contents', form, {
        // Clear an injected JSON default; Axios generates the multipart boundary.
        headers: { 'Content-Type': null },
      });
      return response.data;
    },
    async generateContentDownloadUrl(args: GenerateContentDownloadUrlArgs): Promise<GenerateContentDownloadUrlResponse> {
      const response = await axios.post<GenerateContentDownloadUrlResponse>(`/kc/v2/contents/${encodeURIComponent(args.contentId)}/downloadUrl`);
      return response.data;
    },
    async deleteContentFiles(args: DeleteContentFilesArgs): Promise<DeleteContentFilesResponse | undefined> {
      const response = await axios.delete<DeleteContentFilesResponse>('/kc/v2/contents', {
        params: args,
        paramsSerializer: { indexes: null },
      });
      return response.status === 204 ? undefined : response.data;
    },
  } as const;
}

export type ContentApi = ReturnType<typeof createContentApi>;
