import { createApplicationApi } from './application';
import { createContentApi } from './content';
import { createDeviceApi } from './device';
import { createLicenseApi } from './license';
import { createProfileApi } from './profile';
import { createKnoxV2Axios, type KnoxConfigureOptions } from './transport';

export * from './application';
export * from './content';
export * from './device';
export * from './license';
export * from './profile';
export * from './transport';

/** Current Configure v2. Token acquisition and renewal remain caller-owned. */
export class KnoxConfigureClient {
  readonly device: ReturnType<typeof createDeviceApi>;
  readonly profiles: ReturnType<typeof createProfileApi>;
  readonly license: ReturnType<typeof createLicenseApi>;
  readonly application: ReturnType<typeof createApplicationApi>;
  readonly content: ReturnType<typeof createContentApi>;

  constructor(options: KnoxConfigureOptions) {
    const axios = createKnoxV2Axios(options);
    this.device = createDeviceApi(axios);
    this.profiles = createProfileApi(axios);
    this.license = createLicenseApi(axios);
    this.application = createApplicationApi(axios);
    this.content = createContentApi(axios);
  }
}
