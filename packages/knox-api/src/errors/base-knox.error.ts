export class KnoxRequestError extends Error {
  code: number;
  data: string | undefined;

  constructor(code: number, message: string, data?: string) {
    super(message);
    this.code = code;
    this.data = data;
  }
}
