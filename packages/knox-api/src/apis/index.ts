import { Axios, AxiosInstance } from 'axios';
import { knoxDefaultAxios } from '~/utils';
import { KCDevice, KCLicense, KCProfile } from './kcs';

/**
 * Functions Export
 *
 * functions are mostly suitable for making simple calls or when your code is working on top of functions.
 * They can also be used independently without creating a class instance.
 */
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

  private axios: AxiosInstance;
  private knoxApiToken: string | null = null;
  private region: string | null = null;

  constructor({ knoxApiToken, region }: { knoxApiToken: string; region: string }) {
    if (!knoxApiToken) {
      throw new Error('For the Class type, an X-KNOX-APITOKEN must be injected into the instance.');
    } else {
      this.knoxApiToken = knoxApiToken;
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
      knoxApiToken: this.knoxApiToken,
    });

    this.kcProfile = new KCProfile(this.axios);
    this.kcLicense = new KCLicense(this.axios);
    this.kcDevice = new KCDevice(this.axios);
  }
}
