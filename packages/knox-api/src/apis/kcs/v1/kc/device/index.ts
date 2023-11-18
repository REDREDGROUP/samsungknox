import { AxiosInstance } from 'axios';
import { KCUnassignProfileDevicesArgs, KCUnassignProfileDevicesResponse, UnassignProfileDevices } from './unassign-profile';
import { BaseArgsInput, BaseResponse } from '~/types';
import {
  KCSendCommandToMultipleDeviceArgs,
  KCSendCommandToMultipleDeviceResponse,
  SendCommandToMultipleDevices,
} from './send-command-to-multiple-devices';
import { GetDevice, KCGetDevicesArgs, KCGetDevicesResponse } from './get-devices';
import { GetDeviceLog, KCGetDeviceLogsArgs, KCGetDeviceLogsResponse } from './get-device-logs';
import { DeleteDevice, KCDeleteDevicesArgs, KCDeleteDevicesResponse } from './delete-devices';
import { AssignProfileDevice, KCAssignProfileDeviceArgs, KCAssignProfileDeviceResponse } from './assign-profile';

/**
 * Functions Export
 */
export * from './assign-profile';
export * from './unassign-profile';
export * from './send-command-to-multiple-devices';
export * from './get-devices';
export * from './get-device-logs';
export * from './delete-devices';

/**
 * Class Export
 */
export class KCDevice {
  private axios: AxiosInstance;

  private GetDevice: GetDevice;
  private GetDeviceLog: GetDeviceLog;
  private DeleteDevice: DeleteDevice;
  private AssignProfileDevice: AssignProfileDevice;
  private UnassignProfileDevices: UnassignProfileDevices;
  private SendCommandToMultipleDevices: SendCommandToMultipleDevices;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.GetDevice = new GetDevice({ axios: this.axios });
    this.GetDeviceLog = new GetDeviceLog({ axios: this.axios });
    this.DeleteDevice = new DeleteDevice({ axios: this.axios });
    this.UnassignProfileDevices = new UnassignProfileDevices({ axios: this.axios });
    this.AssignProfileDevice = new AssignProfileDevice({ axios: this.axios });
    this.SendCommandToMultipleDevices = new SendCommandToMultipleDevices({ axios: this.axios });
  }

  public async getDevices({ args }: BaseArgsInput<KCGetDevicesArgs>): Promise<BaseResponse<KCGetDevicesResponse>> {
    return this.GetDevice.getDevices({ args });
  }

  public async getDeviceLogs({ args }: BaseArgsInput<KCGetDeviceLogsArgs>): Promise<BaseResponse<KCGetDeviceLogsResponse>> {
    return this.GetDeviceLog.GetDeviceLogs({ args });
  }

  public async deleteDevice({ args }: BaseArgsInput<KCDeleteDevicesArgs>): Promise<BaseResponse<KCDeleteDevicesResponse>> {
    return this.DeleteDevice.deleteDevice({ args });
  }

  public async assignProfileDevices({ args }: BaseArgsInput<KCAssignProfileDeviceArgs>): Promise<BaseResponse<KCAssignProfileDeviceResponse>> {
    return this.AssignProfileDevice.assignProfileDevices({ args });
  }

  public async unassignProfileDevices({
    args,
  }: BaseArgsInput<KCUnassignProfileDevicesArgs>): Promise<BaseResponse<KCUnassignProfileDevicesResponse>> {
    return this.UnassignProfileDevices.unassignProfileDevices({ args });
  }

  public async sendCommandToMultipleDevices({
    args,
  }: BaseArgsInput<KCSendCommandToMultipleDeviceArgs>): Promise<BaseResponse<KCSendCommandToMultipleDeviceResponse>> {
    return this.SendCommandToMultipleDevices.sendCommandToMultipleDevices({ args });
  }
}
