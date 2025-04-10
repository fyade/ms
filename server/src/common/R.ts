import { HTTP } from './Enum';
import { timeUtils } from "@ms/common";

export class R<T = any> {
  public code: number;
  public data: T;
  public msg: string;
  private time: string;
  private timestamp: number;
  private reqId: string;

  constructor(code: number, data: any, msg: string, reqId: string = '') {
    this.code = code;
    this.data = data;
    this.msg = msg;
    this.time = timeUtils.time();
    this.timestamp = timeUtils.timestamp(this.time);
    this.reqId = reqId;
  }

  static ok(data: any) {
    return new R(HTTP.SUCCESS().code, data, HTTP.SUCCESS().msg);
  }
}
