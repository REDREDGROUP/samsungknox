import { once } from 'node:events';
import { createServer, type IncomingMessage, type RequestListener } from 'node:http';
import { describe, expect, it } from 'vitest';
import { createLicenseApi, type GetLicenseDetailsResponse, type GetLicensesArgs, type GetLicensesResponse, type RegisterLicenseResponse } from './license';
import { createKnoxV2Axios } from './transport';

async function withServer(handler: RequestListener, run: (baseURL: string) => Promise<void>): Promise<void> {
  const server = createServer(handler);
  try {
    const listening = once(server, 'listening', { signal: AbortSignal.timeout(5000) });
    server.listen(0, '127.0.0.1');
    await listening;
    const address = server.address();
    if (address === null || typeof address === 'string') {
      throw new TypeError('Test server must have a TCP address.');
    }
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function readBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

describe('Configure v2 license API', () => {
  it.each([200, 207])('sends all filters as query parameters and preserves returned data when the HTTP status is %s', async (status) => {
    // Given
    const args: GetLicensesArgs = {
      licenseKeys: ['key/one', 'key+two'],
      types: ['SETUP_PER_DEVICE', 'DYNAMIC_PER_SEAT'],
      status: ['Active', 'Pending'],
      searchText: 'My license & owner',
      searchFields: ['licenseKey', 'name', 'owner'],
      pageNum: 0,
      pageSize: 25,
      sortBy: 'activationEndDate',
      sortOrder: 'ascending',
    };
    const body: GetLicensesResponse = {
      totalCount: 1,
      licenses: [
        {
          customerId: 'customer-1',
          issuedDate: 1745304313,
          licenseKey: 'key/one',
          name: 'My license',
          owner: 'Owner',
          status: 'Active',
          type: 'SETUP_PER_DEVICE',
          usage: 'COMMERCIAL',
          seatCount: { purchased: 30, assigned: 4, activated: 3, available: 26 },
          activationInfo: { activationStartDate: 1745304313, activationEndDate: 1776840313 },
        },
      ],
    };
    let receivedMethod: string | undefined;
    let receivedUrl = '';
    let receivedBody = '';
    await withServer(
      async (request, response) => {
        receivedMethod = request.method;
        receivedUrl = request.url ?? '';
        receivedBody = await readBody(request);
        response.writeHead(status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(body));
      },
      async (baseURL) => {
        const api = createLicenseApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
        // When
        const result = await api.getLicenses(args);
        // Then
        expect(result).toEqual(body);
        expect(receivedMethod).toBe('GET');
        expect(receivedBody).toBe('');
        const url = new URL(receivedUrl, baseURL);
        expect(url.pathname).toBe('/kc/v2/licenses');
        expect([...url.searchParams]).toEqual([
          ['licenseKeys', 'key/one'],
          ['licenseKeys', 'key+two'],
          ['types', 'SETUP_PER_DEVICE'],
          ['types', 'DYNAMIC_PER_SEAT'],
          ['status', 'Active'],
          ['status', 'Pending'],
          ['searchText', 'My license & owner'],
          ['searchFields', 'licenseKey'],
          ['searchFields', 'name'],
          ['searchFields', 'owner'],
          ['pageNum', '0'],
          ['pageSize', '25'],
          ['sortBy', 'activationEndDate'],
          ['sortOrder', 'ascending'],
        ]);
      },
    );
  });

  it('omits optional query parameters when no filters are supplied', async () => {
    // Given
    let receivedUrl: string | undefined;
    await withServer(
      (request, response) => {
        receivedUrl = request.url;
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end('{"licenses":[],"totalCount":0}');
      },
      async (baseURL) => {
        const api = createLicenseApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
        // When
        const result = await api.getLicenses();
        // Then
        expect(receivedUrl).toBe('/kc/v2/licenses');
        expect(result).toEqual({ licenses: [], totalCount: 0 });
      },
    );
  });

  it.each([200, 204])('returns license details or undefined when the detail response status is %s', async (status) => {
    // Given
    const body: GetLicenseDetailsResponse = {
      licenseKey: 'key/with +?#%',
      customerId: 'customer',
      issuedDate: 1745304313,
      name: 'License',
      owner: 'Owner',
      status: 'Active',
      type: 'DYNAMIC_PER_SEAT',
      usage: 'TRIAL',
      alertType: 'LicenseExpiringSoon',
      expiringSoonCount: 3,
      transferable: false,
      seatCount: { purchased: 5, available: 2 },
      activationInfo: { activationStartDate: 1745304313, activationEndDate: 1776840313 },
    };
    let receivedUrl: string | undefined;
    let receivedMethod: string | undefined;
    await withServer(
      (request, response) => {
        receivedUrl = request.url;
        receivedMethod = request.method;
        response.writeHead(status, { 'Content-Type': 'application/json' });
        response.end(status === 204 ? undefined : JSON.stringify(body));
      },
      async (baseURL) => {
        const api = createLicenseApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
        // When
        const result = await api.getLicenseDetailsByLicenseKey({ licenseKey: 'key/with +?#%' });
        // Then
        expect(receivedMethod).toBe('GET');
        expect(receivedUrl).toBe('/kc/v2/licenses/key%2Fwith%20%2B%3F%23%25');
        expect(result).toEqual(status === 204 ? undefined : body);
      },
    );
  });

  it('posts the required JSON body and returns registration data when registering a license', async () => {
    // Given
    const args = { licenseKey: 'key/with +?#%', name: 'My license' };
    const body: RegisterLicenseResponse = {
      customerId: 'customer-2',
      issuedDate: 1745304313,
      licenseKey: args.licenseKey,
      name: args.name,
      status: 'Pending',
      type: 'SETUP_STAGGERED',
    };
    let receivedMethod: string | undefined;
    let receivedUrl: string | undefined;
    let contentType: string | undefined;
    let receivedBody = '';
    await withServer(
      async (request, response) => {
        receivedMethod = request.method;
        receivedUrl = request.url;
        contentType = request.headers['content-type'];
        receivedBody = await readBody(request);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(body));
      },
      async (baseURL) => {
        const api = createLicenseApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
        // When
        const result = await api.registerLicense(args);
        // Then
        expect(receivedMethod).toBe('POST');
        expect(receivedUrl).toBe('/kc/v2/licenses/licenseRegistration');
        expect(contentType).toBe('application/json');
        expect(JSON.parse(receivedBody)).toEqual(args);
        expect(result).toEqual(body);
      },
    );
  });

  it('deletes the encoded license key without a body and returns undefined when deletion succeeds', async () => {
    // Given
    let receivedMethod: string | undefined;
    let receivedUrl: string | undefined;
    let receivedBody = '';
    await withServer(
      async (request, response) => {
        receivedMethod = request.method;
        receivedUrl = request.url;
        receivedBody = await readBody(request);
        response.writeHead(204);
        response.end();
      },
      async (baseURL) => {
        const api = createLicenseApi(createKnoxV2Axios({ accessToken: 'token', baseURL }));
        // When
        const result = await api.deleteLicense({ licenseKey: 'key/with +?#%' });
        // Then
        expect(receivedMethod).toBe('DELETE');
        expect(receivedUrl).toBe('/kc/v2/licenses/key%2Fwith%20%2B%3F%23%25');
        expect(receivedBody).toBe('');
        expect(result).toBeUndefined();
      },
    );
  });
});
