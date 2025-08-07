export class ErrorModel {
  private readonly code: number;
  private readonly message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
