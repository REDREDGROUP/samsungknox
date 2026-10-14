import { describe, expect, it } from 'vitest';
import { createApplicationApi } from '../application';
import { createKnoxV2Axios, KnoxV2RequestError } from '../transport';
import { withHttpServer } from './http-test-server';
import type { GetAppDetailsArgs, GetAppDetailsResponse, GetApplicationsArgs, GetApplicationsResponse, UploadPublicApplicationResponse } from './types';

describe('Configure v2 applications over HTTP', () => {
  it('serializes documented filters when retrieving applications', async () => {
    // Given
    const args: GetApplicationsArgs = {
      applicationIds: ['120067', '120068'],
      name: 'My & App',
      source: 'InHouse',
      packageName: 'com.example.app',
      sortBy: 'packageVersion',
      sortOrder: 'ascending',
      pageNum: 0,
      pageSize: 20,
    };
    const body: GetApplicationsResponse = {
      applications: [{ packageName: 'com.example.app', source: 'InHouse', versions: [{ applicationId: '120067', packageVersion: '1.0' }] }],
      totalCount: 1,
    };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getApplications(args);
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('GET');
      expect(request.url.pathname).toBe('/kc/v2/applications');
      expect(request.url.searchParams.getAll('applicationIds')).toEqual(args.applicationIds);
      expect([...request.url.searchParams.keys()]).not.toContain('applicationIds[]');
      for (const [key, value] of Object.entries(args).filter(([key]) => key !== 'applicationIds')) {
        expect(request.url.searchParams.get(key)).toBe(String(value));
      }
      expect(request.body.byteLength).toBe(0);
    });
  });

  it.each([{}, { applications: [], totalCount: 0 }])('preserves an empty response when listing without filters: %j', async (body) => {
    // Given
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getApplications();
      // Then
      expect(result).toEqual(body);
      expect((await received).url.search).toBe('');
    });
  });

  it.each<GetAppDetailsArgs>([{ applicationId: '120067' }, { packageName: 'com.example.app' }])('sends JSON when getting details by %j', async (args) => {
    // Given
    const body: GetAppDetailsResponse = {
      packageName: 'com.example.app',
      applicationCsdk: 'KLM00-test',
      versions: [
        { applicationId: '120067', name: 'App', description: 'Binary', size: 123, checksum: 'abc', status: 'Deployable', thumbnailUrl: 'https://example.test/t.png' },
      ],
    };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.getAppDetails(args);
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/applications/getDetail');
      expect(request.headers['content-type']).toBe('application/json');
      expect(JSON.parse(request.body.toString())).toEqual(args);
    });
  });

  it('preserves success and failure entries when Google Play upload partially fails', async () => {
    // Given
    const one = 'https://play.google.com/store/apps/details?id=one';
    const two = 'https://play.google.com/store/apps/details?id=two';
    const args = { apps: [{ url: one, description: 'One' }, { url: two }] };
    const body: UploadPublicApplicationResponse = {
      successResponse: [{ applicationId: '120067', url: one }],
      errorResponse: [{ error: { code: 40400075, message: 'The app does not exist' }, url: two }],
    };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.uploadPublicApplication(args);
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/applications/googleplayApplications');
      expect(request.headers['content-type']).toBe('application/json');
      expect(JSON.parse(request.body.toString())).toEqual(args);
    });
  });

  it('encodes the application ID when generating a download URL', async () => {
    // Given
    const body = { downloadUrl: 'https://example.test/app.apk' };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.generateAppDownloadUrl({ applicationId: 'app/one ?' });
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/applications/app%2Fone%20%3F/downloadUrl');
      expect(request.url.search).toBe('');
      expect(request.body.byteLength).toBe(0);
    });
  });

  it.each([
    { status: 204, body: undefined },
    { status: 207, body: { failedApplicationIds: ['120068'] } },
    { status: 207, body: {} },
  ])('returns the documented outcome when deletion responds with $status $body', async ({ status, body }) => {
    // Given
    const args = { applicationIds: ['120067', '120068'], packageName: 'com.example.app' };
    await withHttpServer({ status, body }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.deleteApplications(args);
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('DELETE');
      expect(request.url.pathname).toBe('/kc/v2/applications');
      expect(request.url.searchParams.getAll('applicationIds')).toEqual(args.applicationIds);
      expect(request.url.searchParams.get('packageName')).toBe(args.packageName);
      expect(request.body.byteLength).toBe(0);
    });
  });

  it('uses only packageName when deleting a complete package', async () => {
    // Given
    await withHttpServer({ status: 204 }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.deleteApplications({ packageName: 'com.example.app' });
      // Then
      expect(result).toBeUndefined();
      expect([...(await received).url.searchParams]).toEqual([['packageName', 'com.example.app']]);
    });
  });

  it('rejects with transport diagnostics when application access is forbidden', async () => {
    // Given
    await withHttpServer({ status: 403, body: { code: 40300000, errorId: 'trace-app' } }, async ({ baseURL }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = api.getApplications();
      // Then
      await expect(result).rejects.toBeInstanceOf(KnoxV2RequestError);
      await expect(result).rejects.toMatchObject({ status: 403, code: 40300000, errorId: 'trace-app' });
    });
  });
});
