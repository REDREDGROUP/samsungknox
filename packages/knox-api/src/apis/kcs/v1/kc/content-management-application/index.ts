import { AxiosInstance } from 'axios';
import { DeleteApplicationVersion, KCDeleteApplicationVersionsArgs } from './delete-application-versions';
import { BaseArgsInput } from '~/types';

/**
 * Functions Export
 */
export * from './get-applications';
export * from './delete-application-versions';

/**
 * Class Export
 */
export class KCContentManagementApplication {
  private axios: AxiosInstance;
  private DeleteApplicationVersion: DeleteApplicationVersion;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.DeleteApplicationVersion = new DeleteApplicationVersion({ axios: this.axios });
  }

  public async deleteApplicationVersions({ args }: BaseArgsInput<KCDeleteApplicationVersionsArgs>) {
    return this.DeleteApplicationVersion.deleteApplicationVersions({ args });
  }
}
