import { AxiosInstance } from 'axios';
import { BaseArgsInput, BaseKCLicense, BaseResponse } from '~/types';
import { GenerateTrialLicense, KCTrialLicenseArgs } from './generate-trial-license';
import { GetLicenseDetail, KCLicenseDetailArgs, KCLicensesDetailResponse } from './get-license-details-by-license-id';
import { GetLicense, KCLicensesArgs, KCLicensesResponse } from './get-licenses';
import { KCRegisterLicenseArgs, RegisterLicense } from './register-license';
import { KCValidateLicenseArgs, ValidateLicense } from './validate-license';

/**
 * Functions Export
 */
export * from './generate-trial-license';
export * from './get-license-details-by-license-id';
export * from './get-licenses';
export * from './register-license';
export * from './validate-license';

/**
 * Class Export
 */
export class KCLicense {
  private axios: AxiosInstance;
  private ValidateLicense: ValidateLicense;
  private RegisterLicense: RegisterLicense;
  private GetLicense: GetLicense;
  private GetLicenseDetail: GetLicenseDetail;
  private GenerateTrialLicense: GenerateTrialLicense;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.ValidateLicense = new ValidateLicense({ axios: this.axios });
    this.RegisterLicense = new RegisterLicense({ axios: this.axios });
    this.GetLicense = new GetLicense({ axios: this.axios });
    this.GetLicenseDetail = new GetLicenseDetail({ axios: this.axios });
    this.GenerateTrialLicense = new GenerateTrialLicense({ axios: this.axios });
  }

  public async validateLicense({ args }: BaseArgsInput<KCValidateLicenseArgs>): Promise<BaseResponse<BaseKCLicense>> {
    return this.ValidateLicense.validateLicense({ args });
  }

  public async registerLicense({ args }: BaseArgsInput<KCRegisterLicenseArgs>): Promise<BaseResponse<BaseKCLicense>> {
    return this.RegisterLicense.registerLicense({ args });
  }

  public async getLicense({ args }: BaseArgsInput<KCLicensesArgs>): Promise<BaseResponse<KCLicensesResponse>> {
    return this.GetLicense.getLicenses({ args });
  }

  public async getLicenseDetailByLicenseId({ args }: BaseArgsInput<KCLicenseDetailArgs>): Promise<BaseResponse<KCLicensesDetailResponse>> {
    return this.GetLicenseDetail.GetLicenseDetailByLicenseId({ args });
  }

  public async generateTrialLicense({ args }: BaseArgsInput<KCTrialLicenseArgs>): Promise<BaseResponse<BaseKCLicense>> {
    return this.GenerateTrialLicense.generateTrialLicense({ args });
  }
}
