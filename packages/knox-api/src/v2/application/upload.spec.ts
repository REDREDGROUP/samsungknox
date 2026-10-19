import { describe, expect, it } from 'vitest';
import { createApplicationApi } from '../application';
import { createKnoxV2Axios } from '../transport';
import { withHttpServer } from './http-test-server';
import type { ApplicationStatus } from './types';

describe('Configure v2 in-house binary upload', () => {
  it.each<ApplicationStatus>(['InProgress', 'Deployable', 'Failed'])('preserves %s status when uploading APK bytes with a query description', async (status) => {
    // Given
    const bytes = new Uint8Array([0, 255, 128, 13, 10, 80, 75, 1]);
    const description = 'QA & mobile + \uD55C\uAE00?';
    const body = { applicationId: '120067', status };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const axios = createKnoxV2Axios({ accessToken: 'token', baseURL });
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const api = createApplicationApi(axios);
      // When
      const result = await api.uploadInHouseApplication({
        file: new Blob([bytes], { type: 'application/vnd.android.package-archive' }),
        filename: 'app.apk',
        description,
      });
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/applications/inhouseApplications');
      expect([...request.url.searchParams]).toEqual([['description', description]]);
      const contentType = request.headers['content-type'] ?? '';
      expect(contentType).toMatch(/^multipart\/form-data; boundary=.+/);
      const boundary = contentType.split('boundary=')[1];
      expect(request.body.toString('latin1')).toContain(`--${boundary}\r\n`);
      expect(request.body.toString('latin1')).toContain(`--${boundary}--`);
      const form = await new Response(new Uint8Array(request.body), { headers: { 'Content-Type': contentType } }).formData();
      expect([...form.keys()]).toEqual(['file']);
      const file = form.get('file');
      if (!(file instanceof File)) {
        throw new TypeError('Expected a received binary file.');
      }
      expect(file.name).toBe('app.apk');
      expect(file.type).toBe('application/vnd.android.package-archive');
      expect(new Uint8Array(await file.arrayBuffer())).toEqual(bytes);
      expect(axios.defaults.headers.common['Content-Type']).toBe('application/json');
    });
  });

  it('preserves the File name and omits description when neither override is supplied', async () => {
    // Given
    await withHttpServer({ body: {} }, async ({ baseURL, received }) => {
      const api = createApplicationApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.uploadInHouseApplication({ file: new File(['apk'], 'original.apk') });
      // Then
      const request = await received;
      expect(result).toEqual({});
      expect(request.url.search).toBe('');
      const form = await new Response(new Uint8Array(request.body), { headers: { 'Content-Type': request.headers['content-type'] ?? '' } }).formData();
      const file = form.get('file');
      expect(file).toBeInstanceOf(File);
      if (file instanceof File) {
        expect(file.name).toBe('original.apk');
        expect(await file.text()).toBe('apk');
      }
    });
  });
});
