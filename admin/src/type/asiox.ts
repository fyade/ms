export class AxiosRes<T> {
  code!: number;
  data!: T;
  msg!: string;
  time!: Date;
  timestamp!: number;
  reqId!: string;
}

export class PageVo<T = any> {
  pageNum!: number;
  pageSize!: number;
  total!: number;
  list!: T[];
  ifFirst!: boolean;
  ifLast!: boolean;
}
