export class PageVo<T = any> {
  pageNum: number;
  pageSize: number;
  total: number;
  list: T[];
  ifFirst: boolean;
  ifLast: boolean;

  constructor(pageNum: number, pageSize: number, total: number, list: T[]) {
    this.pageNum = Number(pageNum);
    this.pageSize = Number(pageSize);
    this.total = Number(total);
    this.list = list;
    this.ifFirst = Number(pageNum) === 1;
    this.ifLast = Number(pageNum) === Math.ceil(Number(total) / Number(pageSize));
  }
}
