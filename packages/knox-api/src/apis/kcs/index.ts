import { AxiosInstance } from 'axios';
import { knoxKcsInstance } from '~/utils';
import { KCContentManagementApplication, KCContentManagementAsset, KCDevice, KCLicense, KCProfile } from './v1';
import { ERROR_MESSAGES, KnoxRequestError } from '~/errors';

/**
 * Functions Export
 *
 * functions are mostly suitable for making simple calls or when your code is working on top of functions.
 * They can also be used independently without creating a class instance.
 */
export * from './v1';

/**
 * Knox Configure (kc) Instance
 *
 * Class Export
 *
 * If you want to call a lot of APIs at once, or if you want to customize and use your own instances,
 * create a class instance and use it.
 */
export class KcInstance {
  public v1: {
    Profile: KCProfile;
    License: KCLicense;
    Device: KCDevice;
    ContentManagementApplication: KCContentManagementApplication;
    ContentManagementAsset: KCContentManagementAsset;
  };

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
      throw new KnoxRequestError(0, ERROR_MESSAGES.KNOX_REGION_MISSING);
    } else {
      this.region = region.toLowerCase();
    }

    this.axios = knoxKcsInstance({
      region: this.region,
      knoxAccessToken: this.knoxAccessToken,
    });

    this.v1 = {
      Profile: new KCProfile(this.axios),
      License: new KCLicense(this.axios),
      Device: new KCDevice(this.axios),
      ContentManagementApplication: new KCContentManagementApplication(this.axios),
      ContentManagementAsset: new KCContentManagementAsset(this.axios),
    };
  }
}
