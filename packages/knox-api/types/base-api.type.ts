export type BaseApiRequireArgsType<T> = {
  region: string;
} & T;

export type BaseXApiRequireType<T> = {
  knoxAccessToken: string;
} & T;

export type BaseArgsInputType<T> = {
  args: T;
};

export type BaseResponseType<T> = {
  status: 'SUCCESS' | 'FAILED';
  message: string | null;
  result: T;
};

export type BaseKnoxErrorResponse = {
  code: number;
  message: string;
  data?: string;
};
