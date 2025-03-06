// 生成的 prisma 查询参数
export class PrismaParam {
  select?: Record<string, boolean>;
  where!: {
    AND: any[];
  };
  skip!: number;
  take!: number;
  orderBy?: Record<string, string>;
}

// 查询参数的类型为 object 时的格式
export class SelectParamObj {
  in: SelectParamObjIn;
  between: SelectParamObjBetween;

  constructor({
                in: _in = new SelectParamObjIn(),
                between = new SelectParamObjBetween(),
              }: {
                in?: SelectParamObjIn
                between?: SelectParamObjBetween
              } = {},
  ) {
    if (_in.value && _in.value.length > 0) {
      this.in = new SelectParamObjIn(_in);
    } else {
      delete this.in;
    }
    if (between.value && between.value.length > 0) {
      this.between = new SelectParamObjBetween(between);
    } else {
      delete this.between;
    }
  }
}

class SelectParamObjIn {
  type?: string;
  value: (string | number)[];

  constructor({
                type = 'string',
                value = [],
              }: {
                type?: string,
                value?: (string | number)[]
              } = {},
  ) {
    this.type = type;
    this.value = value;
  }
}

class SelectParamObjBetween {
  type?: string;
  value: (string | number)[];

  constructor({
                type = 'string',
                value = [],
              }: {
                type?: string,
                value?: (string | number)[]
              } = {},
  ) {
    this.type = type;
    this.value = value;
  }
}
