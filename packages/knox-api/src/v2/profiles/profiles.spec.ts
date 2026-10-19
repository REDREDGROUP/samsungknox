import { describe, expect, it } from 'vitest';
import { withHttpFixture } from '../device/http-test-server';
import { type CreateProfileRequest, createProfileApi, type GetProfileDetailsResponse, type GetProfilesRequest } from '../profile';
import { createKnoxV2Axios, KnoxV2RequestError } from '../transport';

describe('Configure v2 profiles', () => {
  it('serializes repeated OpenAPI query names when filtering profile lists', async () => {
    // Given
    const args: GetProfilesRequest = {
      profileNames: ['Fleet & kiosk', 'Production'],
      profileIds: ['1129471783', '1129471784'],
      profileType: 'Dynamic',
      knoxVersion: '2.9',
      deviceProductType: 'Tablet',
      deviceLevel: 'Knox',
      pageNum: 0,
      pageSize: 25,
      sortBy: 'name',
      sortOrder: 'ascending',
    };
    const body = {
      profiles: [{ profileId: '1129471783', name: 'Fleet & kiosk', profileType: 'Dynamic', profileState: 'Active', applicationCount: 2 }],
      totalCount: 1,
    };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'profile-token', baseURL }));
      // When
      const result = await api.getProfiles(args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      const url = new URL(request.url ?? '', baseURL);
      expect(request.method).toBe('GET');
      expect(url.pathname).toBe('/kc/v2/profiles');
      expect([...url.searchParams.entries()]).toEqual([
        ['profileNames', 'Fleet & kiosk'],
        ['profileNames', 'Production'],
        ['profileIds', '1129471783'],
        ['profileIds', '1129471784'],
        ['profileType', 'Dynamic'],
        ['knoxVersion', '2.9'],
        ['deviceProductType', 'Tablet'],
        ['deviceLevel', 'Knox'],
        ['pageNum', '0'],
        ['pageSize', '25'],
        ['sortBy', 'name'],
        ['sortOrder', 'ascending'],
      ]);
      expect(request.body).toBe('');
      expect(request.headers.authorization).toBe('Bearer profile-token');
      expect(request.headers['x-knox-apitoken']).toBeUndefined();
    });
  });

  it('uses no query or body when listing profiles without filters', async () => {
    // Given
    const body = { profiles: [], totalCount: 0 };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getProfiles();
      // Then
      expect(result).toEqual(body);
      expect(await received).toMatchObject({ method: 'GET', url: '/kc/v2/profiles', body: '' });
    });
  });

  it('preserves typed nested details when retrieving an encoded profile identifier', async () => {
    // Given
    const body: GetProfileDetailsResponse = {
      profileId: 'profile /?&',
      applicationIds: [789456],
      adminApplicationIds: [789457],
      remoteControlApplicationIds: [789458],
      contentIds: [456789],
      stateCount: { configuredCount: 2, failedToConfigCount: 1 },
      enrollmentLicenseInfo: { licenseKey: 'KLM00-KEY', status: 'Active', type: 'DYNAMIC_PER_SEAT', usage: 'COMMERCIAL' },
      additionalEula: { title: 'Terms', termsAndConditions: 'Agreement', type: 'Enrollment' },
      policy: { customPolicy: '{"KnoxCustom":{}}', dynamicPolicy: { policy: '{"restrictions":{}}', policyScript: [{ id: '60000', content: '{"apnList":{}}' }] } },
      qrCodeEnrollment: { countryISO: 'EU', wifiProxyDetails: { wifiProxy: 'Manual', wifiProxyManualDetails: { hostName: 'proxy.example', port: 8080 } } },
      welcomeScreenConfig: { hasCustomText: false },
    };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getProfileDetails('profile /?&');
      // Then
      expect(result).toEqual(body);
      expect(await received).toMatchObject({ method: 'GET', url: '/kc/v2/profiles/profile%20%2F%3F%26', body: '' });
    });
  });

  it('sends current profile configuration as JSON when creating a profile', async () => {
    // Given
    const args: CreateProfileRequest = {
      name: 'Fleet',
      additionalEula: { title: 'Terms', termsAndConditions: 'Agreement', type: 'Enrollment' },
      applicationIds: [789456],
      customerSupport: { companyName: 'Company', supportPhoneNumber: '+16048539086' },
      description: 'Fleet profile',
      deviceLevel: 'Knox',
      folderConfig: { googlePlayFolderConfig: { folderName: 'Apps', page: 0, x: 1, y: 1 }, resolutionConfig: { columnCount: 4, rowCount: 4, pageCount: 1 } },
      enrollmentLicenseKey: 'KLM00-KEY',
      knoxVersion: '2.9',
      welcomeScreenConfig: {
        hasCustomText: true,
        alignmentType: 'Top',
        backgroundSetting: { brandingType: 'Image', images: [{ contentId: 456789, fileName: 'background.png', size: 1000 }] },
        foregroundSetting: { content: '456790', fileName: 'logo.png' },
        textBody: 'Fleet',
      },
      productInfoScreen: { name: 'Product', nonDismissibleNotification: { appName: 'Agent', notificationMessage: 'Managed' } },
      profileType: 'Dynamic',
      lockScreenHiddenWidgets: { hideDateWidget: true },
    };
    const body = { profileId: '1129471783', name: 'Fleet', createTime: 1745304313 };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.createProfile(args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/profiles');
      expect(request.headers['content-type']).toBe('application/json');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('returns undefined when deleting a profile responds with HTTP 204', async () => {
    // Given
    await withHttpFixture({ status: 204 }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.deleteProfile('profile /?&');
      // Then
      expect(result).toBeUndefined();
      expect(await received).toMatchObject({ method: 'DELETE', url: '/kc/v2/profiles/profile%20%2F%3F%26', body: '' });
    });
  });

  it('separates the encoded path ID and license body when assigning a profile', async () => {
    // Given
    const args = { licenseKey: 'KLM00-KEY', deviceIds: ['353227410022505', 'RAKM2SVY64A'] };
    const body = { code: 2000400, message: 'PROFILE_ASSIGN_SUCCESS', data: 'All devices assigned.' };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.bulkAssign('profile /?&', args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/profiles/profile%20%2F%3F%26/bulkAssign');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('sends only device identifiers when unassigning profiles', async () => {
    // Given
    const args = { deviceIds: ['353227410022505', 'RAKM2SVY64A'] };
    const body = { code: 2000401, message: 'PROFILE_UNASSIGN_SUCCESS', data: 'All devices unassigned.' };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.bulkUnassign(args);
      // Then
      expect(result).toEqual(body);
      const request = await received;
      expect(request.method).toBe('POST');
      expect(request.url).toBe('/kc/v2/profiles/bulkUnassign');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('propagates diagnostics when bulk assignment is rejected', async () => {
    // Given
    const body = { code: 40400000, message: 'License not found', data: 'One requested resource is unavailable.', errorId: 'trace-assign' };
    await withHttpFixture({ status: 404, body }, async (baseURL) => {
      const api = createProfileApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = api.bulkAssign('1129471783', { licenseKey: 'missing', deviceIds: ['353227410022505', 'RAKM2SVY64A'] });
      // Then
      await expect(result).rejects.toBeInstanceOf(KnoxV2RequestError);
      await expect(result).rejects.toMatchObject({ status: 404, code: 40400000, errorId: 'trace-assign' });
    });
  });
});
