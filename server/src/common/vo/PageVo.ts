export class PageVo<T = any> {
  pageNum: number;
  pageSize: number;
  total: number;
  list: T[];
  ifFirst: boolean;
  ifLast: boolean;
}