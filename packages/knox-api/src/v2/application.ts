import type { AxiosInstance } from 'axios';
import type {
  DeleteApplicationsArgs,
  DeleteApplicationsResponse,
  GenerateAppDownloadUrlArgs,
  GenerateAppDownloadUrlResponse,
  GetAppDetailsArgs,
  GetAppDetailsResponse,
  GetApplicationsArgs,
  GetApplicationsResponse,
  UploadInHouseApplicationArgs,
  UploadInHouseApplicationResponse,
  UploadPublicApplicationArgs,
  UploadPublicApplicationResponse,
} from './application/types';

export * from './application/types';

export function createApplicationApi(axios: AxiosInstance) {
  return {
    async getApplications(args: GetApplicationsArgs = {}): Promise<GetApplicationsResponse> {
      const response = await axios.get<GetApplicationsResponse>('/kc/v2/applications', {
        params: args,
        paramsSerializer: { indexes: null },
      });
      return response.data;
    },
    async getAppDetails(args: GetAppDetailsArgs): Promise<GetAppDetailsResponse> {
      const response = await axios.post<GetAppDetailsResponse>('/kc/v2/applications/getDetail', args);
      return response.data;
    },
    async uploadPublicApplication(args: UploadPublicApplicationArgs): Promise<UploadPublicApplicationResponse> {
      const response = await axios.post<UploadPublicApplicationResponse>('/kc/v2/applications/googleplayApplications', args);
      return response.data;
    },
    async uploadInHouseApplication(args: UploadInHouseApplicationArgs): Promise<UploadInHouseApplicationResponse> {
      const form = new FormData();
      if (args.filename === undefined) {
        form.append('file', args.file);
      } else {
        form.append('file', args.file, args.filename);
      }
      const response = await axios.post<UploadInHouseApplicationResponse>('/kc/v2/applications/inhouseApplications', form, {
        params: { description: args.description },
        // Clear an injected JSON default; Axios generates the multipart boundary.
        headers: { 'Content-Type': null },
      });
      return response.data;
    },
    async deleteApplications(args: DeleteApplicationsArgs): Promise<DeleteApplicationsResponse | undefined> {
      const response = await axios.delete<DeleteApplicationsResponse>('/kc/v2/applications', {
        params: args,
        paramsSerializer: { indexes: null },
      });
      return response.status === 204 ? undefined : response.data;
    },
    async generateAppDownloadUrl(args: GenerateAppDownloadUrlArgs): Promise<GenerateAppDownloadUrlResponse> {
      const response = await axios.post<GenerateAppDownloadUrlResponse>(`/kc/v2/applications/${encodeURIComponent(args.applicationId)}/downloadUrl`);
      return response.data;
    },
  } as const;
}

export type ApplicationApi = ReturnType<typeof createApplicationApi>;
