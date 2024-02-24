import { Logger } from '@/common';

export type FunctionsCommonOptions<T> = {
  log: Logger;
} & T;
