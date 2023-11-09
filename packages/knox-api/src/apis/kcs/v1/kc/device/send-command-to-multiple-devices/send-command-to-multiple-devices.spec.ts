import { describe, expect, it } from 'vitest';
import { KnoxRequestError } from '~/errors';
import { kcSendCommandToMultipleDevices } from './send-command-to-multiple-devices';

describe('PUT /kcs/v1/kc/devices/command Test', () => {
  it('X-KNOX_APITOKEN missing', async () => {
    let hasError = false;

    try {
      await kcSendCommandToMultipleDevices({
        region: 'US',
        knoxAccessToken: '',
        args: {
          command: 'REBOOT',
          devices: ['DEVICE_ID1'],
        },
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.message).toMatch('RESOURCE_INVALID_PARAM');
        expect(error.code).toBe(4000000);
      }
    }

    expect(hasError).toBeTruthy();
  });

  it('unknown region', async () => {
    let hasError = false;

    try {
      await kcSendCommandToMultipleDevices({
        region: 'TEST',
        knoxAccessToken: '',
        args: {
          command: 'REBOOT',
          devices: ['DEVICE_ID1'],
        },
      });
    } catch (error) {
      if (error instanceof KnoxRequestError) {
        hasError = true;
        expect(error).toBeInstanceOf(KnoxRequestError);
        expect(error.code).toBe(0);
      }
    }

    expect(hasError).toBeTruthy();
  });
});
