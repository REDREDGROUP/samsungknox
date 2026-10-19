import { describe, expect, expectTypeOf, it } from 'vitest';
import { createDeviceApi, type GetDevicesRequest, type GetDevicesResponse, kcV2GetDevices } from '../device';
import { createKnoxV2Axios, type KnoxV2Request, KnoxV2RequestError } from '../transport';
import { withHttpFixture } from './http-test-server';

const listDevices = {
  factory: ({ args, ...options }: KnoxV2Request<GetDevicesRequest>) => createDeviceApi(createKnoxV2Axios(options)).getDevices(args),
  standalone: kcV2GetDevices,
} as const;

describe('Configure v2 devices', () => {
  it.each(['factory', 'standalone'] as const)('sends the cursor JSON and preserves nested results when listing with %s', async (style) => {
    // Given
    const cursor = [{ updateTime: 1745304313, tie: '353227410022505', nested: { flags: [true, null] } }];
    const args: GetDevicesRequest = {
      deviceIds: ['353227410022505', 'RAKM2SVY64A'],
      profileIds: ['1129471783'],
      deviceState: ['Configured'],
      pageSize: 100,
      sortBy: 'lastSeenTime',
      sortOrder: 'ascending',
      searchAfter: cursor,
    };
    const body: GetDevicesResponse = {
      devices: [
        {
          deviceInfo: { deviceId: '353227410022505', type: 'IMEI', model: 'SM-G973F', primaryImei: '353227410022505' },
          profileInfo: { profileId: '1129471783', profileName: 'Managed', profileVersion: 'V1', latestProfile: true },
          licenseInfo: { licenseId: '678467ea11d0953b9d518be7', kcLicenseType: 'SETUP_PER_DEVICE', serviceEndDate: 1745304313 },
          uploadInfo: { uploadId: 'upload-id', uploadTime: 1745304000 },
          meta: { createTime: 1745304000, lastChange: 1745304313 },
          configWarnings: [{ code: '91006', packages: ['com.example.agent'], reason: 'Not installed' }],
          scheduledPushInfo: { pushScheduleId: 'push-id', scheduleTime: 1745305000 },
          lockAndUnlockInfo: { command: 'deviceLock', lockPassCode: 'unlock-code' },
          exchanges: [{ deviceInformation: { mei: '353227410022504', serial: 'OLD-SERIAL' }, state: 'Verified' }],
          assignedByInfo: { role: 'IT_ADMIN', profileAlias: { id: '1129471783', alias: 'Fleet' } },
          deviceState: 'Configured',
          tags: ['fleet'],
        },
      ],
      totalCount: 2,
      nextSearchAfter: [{ updateTime: 1745305000, tie: 'RAKM2SVY64A' }],
    };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const options = { accessToken: 'device-token', managedTenantId: 'customer-1', baseURL };
      // When
      const result = await listDevices[style]({ ...options, args });
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/devices/getDevices');
      expect(JSON.parse(request.body)).toEqual(args);
      expect(request.headers.authorization).toBe('Bearer device-token');
      expect(request.headers['x-wsm-managed-tenantid']).toBe('customer-1');
      expect(request.headers['x-knox-apitoken']).toBeUndefined();
      expect(request.headers['content-type']).toBe('application/json');
    });
  });

  it.each([
    {},
    { pageNum: 0, pageSize: 25 },
    { searchAfter: null },
  ] satisfies readonly GetDevicesRequest[])('preserves pagination values when listing with %j', async (args) => {
    // Given
    const body = { devices: [], totalCount: 0, nextSearchAfter: null };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createDeviceApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getDevices(args);
      // Then
      expect(result).toEqual(body);
      expect(JSON.parse((await received).body)).toEqual(args);
    });
  });

  it('sends the device identifier in JSON when requesting paged logs', async () => {
    // Given
    const args = { deviceId: 'RAKM2SVY64A', oldImeiSn: '353227410022504', pageNum: 0, pageSize: 25 };
    const body = {
      deviceId: args.deviceId,
      deviceLogs: [{ errorCode: '51010', state: 'CustomizationFailed', updateTime: 1745304313, warnings: [{ code: '91006', packages: ['com.example.agent'] }] }],
      totalCount: 1,
    };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createDeviceApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getDeviceLogs(args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/devices/getDeviceLogs');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('returns undefined when bulk deletion responds with HTTP 204', async () => {
    // Given
    const args = { deviceIds: ['353227410022505', 'RAKM2SVY64A'] };
    await withHttpFixture({ status: 204 }, async (baseURL, received) => {
      const api = createDeviceApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.bulkDelete(args);
      // Then
      expect(result).toBeUndefined();
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/devices/bulkDelete');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it.each(['REBOOT', 'FACTORY RESET'] as const)('preserves the common response when sending %s', async (command) => {
    // Given
    const args = { command, deviceIds: ['353227410022505', 'RAKM2SVY64A'] };
    const body = { code: 2000000, message: 'SUCCESS', data: 'OK' };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createDeviceApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.sendCommand(args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/devices/sendCommand');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it.each(['factory', 'standalone'] as const)('propagates status and diagnostics when the %s listing is rejected', async (style) => {
    // Given
    const body = { code: 40000000, message: 'Invalid parameter', errorId: 'trace-device' };
    await withHttpFixture({ status: 400, body }, async (baseURL) => {
      const options = { accessToken: 'token', baseURL };
      // When
      const result = listDevices[style]({ ...options, args: { pageNum: -1 } });
      // Then
      await expect(result).rejects.toBeInstanceOf(KnoxV2RequestError);
      await expect(result).rejects.toMatchObject({ status: 400, code: 40000000, errorId: 'trace-device' });
    });
  });

  it('preserves common diagnostics when the HTTP boundary returns a partial failure', async () => {
    // Given: fault injection, not a documented sendCommand 207 contract.
    const body = { code: 40000000, message: 'RESOURCE_INVALID_PARAM', data: '{"failedDeviceIds":["RAKM2SVY64A"]}' };
    await withHttpFixture({ status: 207, body }, async (baseURL) => {
      const api = createDeviceApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.sendCommand({ command: 'REBOOT', deviceIds: ['353227410022505', 'RAKM2SVY64A'] });
      // Then
      expect(result).toEqual(body);
    });
  });

  it('excludes offset pagination when a cursor is provided', () => {
    // Given
    type CursorRequest = Extract<GetDevicesRequest, { readonly pageNum?: never }>;
    // When / Then
    expectTypeOf<CursorRequest['pageNum']>().toEqualTypeOf<undefined>();
  });
});
