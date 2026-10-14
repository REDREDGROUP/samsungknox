import type { AxiosInstance } from 'axios';
import type { GetLicenseDetailsResponse, GetLicensesArgs, GetLicensesResponse, LicenseKeyArgs, RegisterLicenseArgs, RegisterLicenseResponse } from './license.types';

export type * from './license.types';

export type LicenseApi = {
  readonly getLicenses: (args?: GetLicensesArgs) => Promise<GetLicensesResponse>;
  readonly getLicenseDetailsByLicenseKey: (args: LicenseKeyArgs) => Promise<GetLicenseDetailsResponse | undefined>;
  readonly registerLicense: (args: RegisterLicenseArgs) => Promise<RegisterLicenseResponse>;
  readonly deleteLicense: (args: LicenseKeyArgs) => Promise<void>;
};

export function createLicenseApi(axios: AxiosInstance): LicenseApi {
  return {
    async getLicenses(args = {}) {
      // OpenAPI query arrays use form/explode defaults: repeated keys, not brackets.
      const response = await axios.get<GetLicensesResponse>('/kc/v2/licenses', { params: args, paramsSerializer: { indexes: null } });
      return response.data;
    },
    async getLicenseDetailsByLicenseKey({ licenseKey }) {
      const response = await axios.get<GetLicenseDetailsResponse>(`/kc/v2/licenses/${encodeURIComponent(licenseKey)}`);
      return response.status === 204 ? undefined : response.data;
    },
    async registerLicense(args) {
      const response = await axios.post<RegisterLicenseResponse>('/kc/v2/licenses/licenseRegistration', args);
      return response.data;
    },
    async deleteLicense({ licenseKey }) {
      await axios.delete<void>(`/kc/v2/licenses/${encodeURIComponent(licenseKey)}`);
    },
  };
}
