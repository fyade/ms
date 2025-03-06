export interface CgTablesInterface {
  rowIndex: number;
  tableNameCnInitial: string;
  tableNameEnInitial: string;
  tableNameCn: string;
  tableNameEn: string;
  cols: CgColsInterface[];
}

export interface CgColsInterface {
  colInfo: string;
  colName: string;
  colType: string;
  ifMust: boolean;
  colRemark: string;
}

