import { describe, expect, it } from 'vitest';
import { withHttpFixture } from '../device/http-test-server';
import { KnoxConfigureClient, KnoxV2RequestError } from '../index';

describe('Configure v2 profile pushes and notifications', () => {
  it('pushes selected devices with encoded profile ID and preserves the accepted result', async () => {
    const args = { profilePushType: 'ProfilePush', deviceIds: ['QA-SERIAL-1'], noUserConsent: true, customPushMessageId: 'notice-1' } as const;
    const body = { code: 2000404, message: 'PROFILE_UPDATE_REQUEST_ACCEPTED', data: 'Accepted for processing.' };
    await withHttpFixture({ status: 202, body }, async (baseURL, received) => {
      const client = new KnoxConfigureClient({ accessToken: 'profile-token', managedTenantId: 'qa-tenant', baseURL });
      expect(await client.profiles.bulkPush('profile /?&', args)).toEqual(body);
      const request = await received;
      expect(request).toMatchObject({ method: 'POST', url: '/kc/v2/profiles/profile%20%2F%3F%26/bulkPush' });
      expect(request.headers.authorization).toBe('Bearer profile-token');
      expect(request.headers['x-wsm-managed-tenantid']).toBe('qa-tenant');
      expect(request.headers['x-knox-apitoken']).toBeUndefined();
      expect(request.headers['content-type']).toBe('application/json');
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('omits deviceIds to push a full update to every assigned device', async () => {
    await withHttpFixture({ status: 202, body: { code: 2000404 } }, async (baseURL, received) => {
      const client = new KnoxConfigureClient({ accessToken: 'token', baseURL });
      await client.profiles.bulkPush('1129471783', { profilePushType: 'ProfileDeltaPush' });
      expect(JSON.parse((await received).body)).toEqual({ profilePushType: 'ProfileDeltaPush' });
    });
  });

  it('creates a versioned custom notification and preserves its identifier', async () => {
    const args = { version: 'V1.0', message: 'Fleet update', hyperlink: 'https://example.invalid/?a=1&b=2' };
    await withHttpFixture({ status: 201, body: { id: 'notice-1' } }, async (baseURL, received) => {
      const client = new KnoxConfigureClient({ accessToken: 'token', baseURL });
      expect(await client.profiles.createCustomPushNotification('profile /?&', args)).toEqual({ id: 'notice-1' });
      const request = await received;
      expect(request).toMatchObject({ method: 'POST', url: '/kc/v2/profiles/profile%20%2F%3F%26/customNotifications' });
      expect(JSON.parse(request.body)).toEqual(args);
    });
  });

  it('accepts notifications without optional hyperlinks or response identifiers', async () => {
    await withHttpFixture({ status: 201, body: {} }, async (baseURL, received) => {
      const client = new KnoxConfigureClient({ accessToken: 'token', baseURL });
      expect(await client.profiles.createCustomPushNotification('1129471783', { version: 'V1.0', message: 'Fleet update' })).toEqual({});
      expect(JSON.parse((await received).body)).toEqual({ version: 'V1.0', message: 'Fleet update' });
    });
  });

  it('retrieves custom notifications without a body or query and preserves optional fields', async () => {
    const body = { messages: [{ id: 'notice-1', version: 'V1.0', message: 'Fleet update', latestSelected: false }, { latestSelected: true }, {}] };
    await withHttpFixture({ body }, async (baseURL, received) => {
      const client = new KnoxConfigureClient({ accessToken: 'token', baseURL });
      expect(await client.profiles.getCustomPushNotifications('profile /?&')).toEqual(body);
      expect(await received).toMatchObject({ method: 'GET', url: '/kc/v2/profiles/profile%20%2F%3F%26/customNotifications', body: '' });
    });
  });

  it('preserves forbidden diagnostics without retaining the bearer token', async () => {
    await withHttpFixture({ status: 403, body: { code: 40300000, errorId: 'qa-notification-denied' } }, async (baseURL) => {
      const client = new KnoxConfigureClient({ accessToken: 'profile-token', baseURL });
      const result = client.profiles.createCustomPushNotification('1129471783', { version: 'V1.0', message: 'Fleet update' });
      await expect(result).rejects.toBeInstanceOf(KnoxV2RequestError);
      await expect(result).rejects.toMatchObject({ status: 403, code: 40300000, errorId: 'qa-notification-denied' });
    });
  });
});
