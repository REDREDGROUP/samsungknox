import { AxiosInstance } from 'axios';
import { knoxDefaultAxios } from '~/utils';
import { KCContentManagementApplication, KCContentManagementAsset, KCDevice, KCLicense, KCProfile } from './kcs';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';

/**
 * Functions Export
 *
 * functions are mostly suitable for making simple calls or when your code is working on top of functions.
 * They can also be used independently without creating a class instance.
 */
export * from './custom';
export * from './ams';
export * from './kcs';

/**
 * Class Export
 *
 * If you want to call a lot of APIs at once, or if you want to customize and use your own instances,
 * create a class instance and use it.
 */
export class KnoxInstance {
  public kcProfile: KCProfile;
  public kcLicense: KCLicense;
  public kcDevice: KCDevice;
  public kcContentManagementApplication: KCContentManagementApplication;
  public kcContentManagementAsset: KCContentManagementAsset;

  private axios: AxiosInstance;
  private knoxAccessToken: string | null = null;
  private region: string | null = null;

  constructor({ knoxAccessToken, region }: { knoxAccessToken: string; region: string }) {
    if (!knoxAccessToken) {
      throw new KnoxRequestError(0, ERROR_MESSAGES.KNOX_ACCESS_TOKEN_MISSING);
    } else {
      this.knoxAccessToken = knoxAccessToken;
    }

    if (!region) {
      console.warn(
        'region was not injected, so it was automatically set to the default region of US. It is recommended that you add region manually to avoid making calls to a different or unexpected region.',
      );
      this.region = 'US';
    } else {
      this.region = region.toLowerCase();
    }

    this.axios = knoxDefaultAxios({
      region: this.region,
      knoxAccessToken: this.knoxAccessToken,
    });

    this.kcProfile = new KCProfile(this.axios);
    this.kcLicense = new KCLicense(this.axios);
    this.kcDevice = new KCDevice(this.axios);
    this.kcContentManagementApplication = new KCContentManagementApplication(this.axios);
    this.kcContentManagementAsset = new KCContentManagementAsset(this.axios);
  }
}
