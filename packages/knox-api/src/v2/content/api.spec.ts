import { describe, expect, it } from 'vitest';
import { withHttpServer } from '../application/http-test-server';
import { createContentApi } from '../content';
import { createKnoxV2Axios, KnoxV2RequestError } from '../transport';

describe('Configure v2 content over HTTP', () => {
  it.each([true, false])('uploads binary image bytes when filename override is %s', async (override) => {
    // Given
    const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 255, 128]);
    const body = { contentId: '123654', contentSize: bytes.byteLength };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const axios = createKnoxV2Axios({ accessToken: 'token', baseURL });
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const api = createContentApi(axios);
      // When
      const result = await api.uploadContentFiles({
        file: new File([bytes], 'original.png', { type: 'image/png' }),
        ...(override ? { filename: 'override.png' } : {}),
      });
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/contents');
      expect(request.url.search).toBe('');
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
      expect(file.name).toBe(override ? 'override.png' : 'original.png');
      expect(file.type).toBe('image/png');
      expect(new Uint8Array(await file.arrayBuffer())).toEqual(bytes);
      expect(axios.defaults.headers.common['Content-Type']).toBe('application/json');
    });
  });

  it('preserves an empty object when the upload response omits optional fields', async () => {
    // Given
    await withHttpServer({ body: {} }, async ({ baseURL }) => {
      const api = createContentApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.uploadContentFiles({ file: new Blob(['image']), filename: 'image.jpg' });
      // Then
      expect(result).toEqual({});
    });
  });

  it('encodes content IDs when generating download URLs', async () => {
    // Given
    const body = { downloadUrl: 'https://example.test/image.png' };
    await withHttpServer({ body }, async ({ baseURL, received }) => {
      const api = createContentApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.generateContentDownloadUrl({ contentId: 'image/one ?' });
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('POST');
      expect(request.url.pathname).toBe('/kc/v2/contents/image%2Fone%20%3F/downloadUrl');
      expect(request.url.search).toBe('');
      expect(request.body.byteLength).toBe(0);
    });
  });

  it.each([
    { status: 204, body: undefined },
    { status: 207, body: { failedContentIds: ['123655'] } },
    { status: 207, body: {} },
  ])('preserves the documented delete outcome when status is $status and body is $body', async ({ status, body }) => {
    // Given
    const args = { contentIds: ['123654', '123655'] };
    await withHttpServer({ status, body }, async ({ baseURL, received }) => {
      const api = createContentApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = await api.deleteContentFiles(args);
      // Then
      const request = await received;
      expect(result).toEqual(body);
      expect(request.method).toBe('DELETE');
      expect(request.url.pathname).toBe('/kc/v2/contents');
      expect(request.url.searchParams.getAll('contentIds')).toEqual(args.contentIds);
      expect([...request.url.searchParams.keys()]).not.toContain('contentIds[]');
      expect(request.body.byteLength).toBe(0);
    });
  });

  it('propagates transport diagnostics when a content download request is rejected', async () => {
    // Given
    await withHttpServer({ status: 400, body: { code: 40000000, errorId: 'trace-content' } }, async ({ baseURL }) => {
      const api = createContentApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
      // When
      const result = api.generateContentDownloadUrl({ contentId: 'missing' });
      // Then
      await expect(result).rejects.toBeInstanceOf(KnoxV2RequestError);
      await expect(result).rejects.toMatchObject({ status: 400, code: 40000000, errorId: 'trace-content' });
    });
  });
});
