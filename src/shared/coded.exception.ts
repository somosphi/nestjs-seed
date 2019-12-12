export class CodedException extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
