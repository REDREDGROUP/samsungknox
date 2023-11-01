export type BaseApiHeaderType<T> = {
  region: string;
} & T;

export type BaseResponseType<T> =
  | {
      status: 'SUCCESS' | 'FAILED';
      message: string | null;
      result: T;
    }
  | undefined;

export type BaseKnoxErrorResponse = {
  code: number;
  message: string;
  data?: string;
};
