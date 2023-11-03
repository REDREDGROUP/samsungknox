export type BaseApiRequireArgs<T> = {
  region: string;
} & T;

export type BaseXApiRequire<T> = {
  knoxAccessToken: string;
} & T;

export type BaseArgsInput<T> = {
  args: T;
};

export type BaseResponse<T> = {
  status: 'SUCCESS' | 'FAILED';
  message: string | null;
  result: T;
};

export type BaseKnoxErrorResponse = {
  code: number;
  message: string;
  data?: string;
};
