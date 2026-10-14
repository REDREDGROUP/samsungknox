import type { AxiosInstance } from 'axios';
import type {
  BulkDeleteDevicesRequest,
  CommonResponse,
  GetDeviceLogsRequest,
  GetDeviceLogsResponse,
  GetDevicesRequest,
  GetDevicesResponse,
  SendCommandRequest,
} from './device/types';
import { createKnoxV2Axios, type KnoxV2Request } from './transport';

export type * from './device/details';
export type * from './device/types';

export function createDeviceApi(axios: AxiosInstance) {
  return {
    async getDevices(args: GetDevicesRequest = {}): Promise<GetDevicesResponse> {
      const { data } = await axios.post<GetDevicesResponse>('/kc/v2/devices/getDevices', args);
      return data;
    },
    async getDeviceLogs(args: GetDeviceLogsRequest): Promise<GetDeviceLogsResponse> {
      const { data } = await axios.post<GetDeviceLogsResponse>('/kc/v2/devices/getDeviceLogs', args);
      return data;
    },
    async bulkDelete(args: BulkDeleteDevicesRequest): Promise<void> {
      await axios.post<void>('/kc/v2/devices/bulkDelete', args);
    },
    async sendCommand(args: SendCommandRequest): Promise<CommonResponse> {
      const { data } = await axios.post<CommonResponse>('/kc/v2/devices/sendCommand', args);
      return data;
    },
  } as const;
}

/** The standalone form delegates to the factory, so its wire contract cannot diverge. */
export function kcV2GetDevices({ args, ...options }: KnoxV2Request<GetDevicesRequest>): Promise<GetDevicesResponse> {
  return createDeviceApi(createKnoxV2Axios(options)).getDevices(args);
}
