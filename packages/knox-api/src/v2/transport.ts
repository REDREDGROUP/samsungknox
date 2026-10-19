import axios, { AxiosError, type AxiosInstance } from 'axios';

export type KnoxConfigureOptions = {
  readonly accessToken: string;
  readonly baseURL?: string;
  readonly managedTenantId?: string;
  readonly timeout?: number;
};

export type KnoxV2Request<T> = KnoxConfigureOptions & { readonly args: T };

/** Safe diagnostics only: never retain the Axios cause, config, headers, or body. */
export class KnoxV2RequestError extends Error {
  readonly name = 'KnoxV2RequestError';

  constructor(
    readonly status: number | undefined,
    readonly code: number | string | undefined,
    readonly errorId: string | undefined,
  ) {
    super(status === undefined ? 'Knox Configure request failed without an HTTP response.' : `Knox Configure request failed (HTTP ${status}).`);
  }
}

export function createKnoxV2Axios(options: KnoxConfigureOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL ?? 'https://api.samsungknox.com',
    timeout: options.timeout ?? 30000,
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
      ...(options.managedTenantId !== undefined && { 'x-wsm-managed-tenantid': options.managedTenantId }),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (!(error instanceof AxiosError)) {
        throw error;
      }

      const body: unknown = error.response?.data;
      let code: number | string | undefined;
      let errorId: string | undefined;
      // No new parser dependency: extract only the documented diagnostic fields.
      if (typeof body === 'object' && body !== null) {
        if ('code' in body && typeof body.code === 'number' && Number.isSafeInteger(body.code)) {
          code = body.code;
        }
        if ('errorId' in body && typeof body.errorId === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(body.errorId) && !body.errorId.includes(options.accessToken)) {
          errorId = body.errorId;
        }
      }
      if (error.response === undefined && typeof error.code === 'string' && /^[A-Z][A-Z0-9_]{0,63}$/.test(error.code)) {
        code = error.code;
      }
      throw new KnoxV2RequestError(error.response?.status, code, errorId);
    },
  );

  return instance;
}
