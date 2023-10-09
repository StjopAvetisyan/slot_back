export type LogicalErrorFormat = {
  code: number;
  message: string;
};

export class LogicalError extends Error {
  readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  format(): LogicalErrorFormat {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
