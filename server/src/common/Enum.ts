export class HTTP {
  public code: number;
  public msg: string;

  private constructor(code: number, msg: string) {
    this.code = code;
    this.msg = msg;
  }

  static SUCCESS() {
    return new HTTP(200, 'success');
  }

  static SERVER_ERROR() {
    return new HTTP(501, 'server_error');
  }
}
