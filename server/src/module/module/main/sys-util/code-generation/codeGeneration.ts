/**
 * 代码生成说明：
 *
 * 后端部分：
 * * 在 src/module/模块/业务/ 目录内新增 .controller.ts
 * * 在 src/module/模块/业务/ 目录内新增 .service.ts
 * * 在 src/module/模块/业务/ 目录内新增 dto.ts
 * * 在 src/module/模块/业务/ 目录内新增 .module.ts，并在 @module().controllers 中引入 controller，在 @module().providers 中引入 service、AuthService、JwtService
 * * 在 app.module.ts 中，导入 module 文件，并在 @module().imports 中添加
 *
 * 前端部分：
 * * 接口：在 src/api/module/模块/ 目录内新增 业务.ts 文件
 * * 类型：在 src/type/api/模块/ 目录内新增 业务.ts 文件
 * * 页面：在 src/views/模块/业务/ 目录内新增 index.vue 文件
 */
import { CodeGenTableDto } from '../code-gen-table/dto';
import { CodeGenColumnDto } from '../code-gen-column/dto';
import { base } from '../../../../../util/base';
import { Exception } from '../../../../../exception/exception';
import { SysDto } from '../../sys-manage/sys/dto';
import { baseUtils } from "@ms/common";

const publicDict = {
  id: '主键id',
  remark: '备注',
  orderNum: '顺序',
  ifDefault: '是否默认',
  ifDisabled: '是否禁用',
  createRole: 'createRole',
  updateRole: 'updateRole',
  createBy: 'createBy',
  updateBy: 'updateBy',
  createTime: 'createTime',
  updateTime: 'updateTime',
  deleted: '逻辑删除',
};
export const baseInterfaceColumns = [
  'createRole',
  'updateRole',
  'createBy',
  'updateBy',
  'createTime',
  'updateTime',
  'deleted'
]
export const baseInterfaceColumns2 = [
  'id',
  ...baseInterfaceColumns
]

// 代码生成
export function codeGeneration({ table, columns, sys }: { table: CodeGenTableDto, columns: CodeGenColumnDto[], sys: SysDto }) {
  const find = columns.find(item => item.colName === 'id');
  if (!find) {
    throw new Exception('无id字段。');
  }
  // 驼峰 首字母小写
  const businessName1 = baseUtils.lowercaseFirstLetter(table.businessName);
  const moduleName1 = baseUtils.lowercaseFirstLetter(table.moduleName);
  const entityName1 = baseUtils.lowercaseFirstLetter(table.entityName);
  // 驼峰 首字母大写
  const businessName2 = baseUtils.capitalizeFirstLetter(businessName1);
  const moduleName2 = baseUtils.capitalizeFirstLetter(moduleName1);
  const entityName2 = baseUtils.capitalizeFirstLetter(entityName1);
  // 短横线
  const businessName3 = baseUtils.toKebabCase(businessName1);
  const moduleName3 = baseUtils.toKebabCase(moduleName1);
  const entityName3 = baseUtils.toKebabCase(entityName1);
  // 系统
  const sysPath = sys.path;
  // 是否有业务模块
  const isBusiness = !!table.businessName

  const hd2_prismaConfig = (() => {
    const o = {};
    const tsNames = columns.map(item => item.tsName);
    const selListParam = {
      data: 'dto',
      orderBy: columns
        .filter(item => !baseInterfaceColumns2.includes(item.tsName))
        .findIndex(item => item.colName === 'order_num') > -1,
      selKeys: columns
        .filter(item => !baseInterfaceColumns2.includes(item.tsName))
        .filter(item => item.ifSelMore === base.Y)
        .map(item => baseUtils.toCamelCase(item.colName)),
      notNullKeys: columns
        .filter(item => !baseInterfaceColumns2.includes(item.tsName))
        .filter(item => item.ifRequired === base.Y)
        .map(item => baseUtils.toCamelCase(item.colName)),
      numberKeys: columns
        .filter(item => !baseInterfaceColumns2.includes(item.tsName))
        .filter(item => item.tsType === 'number')
        .map(item => baseUtils.toCamelCase(item.colName)),
      completeMatchingKeys: columns
        .filter(item => !baseInterfaceColumns2.includes(item.tsName))
        .filter(item => item.selType === 'equals')
        .map(item => baseUtils.toCamelCase(item.colName)),
      ifDeleted: false,
    };
    o['notNullKeys'] = selListParam.notNullKeys;
    o['numberKeys'] = selListParam.numberKeys;
    o['completeMatchingKeys'] = selListParam.completeMatchingKeys;
    if (ifDelSelKeys(selListParam.selKeys)) delete selListParam.selKeys;
    if (selListParam.notNullKeys.length === 0) delete selListParam.notNullKeys;
    if (selListParam.numberKeys.length === 0) delete selListParam.numberKeys;
    if (selListParam.completeMatchingKeys.length === 0) delete selListParam.completeMatchingKeys;
    if (tsNames.includes('deleted')) delete selListParam.ifDeleted;

    delete selListParam.notNullKeys;
    delete selListParam.numberKeys;
    delete selListParam.completeMatchingKeys;
    delete selListParam.ifDeleted;

    const selAllParam = selListParam;

    const selOnesParam = {
      selKeys: columns.filter(item => item.ifSelMore === base.Y).map(item => baseUtils.toCamelCase(item.colName)),
      ifDeleted: false,
    };
    if (ifDelSelKeys(selOnesParam.selKeys)) delete selOnesParam.selKeys;
    if (tsNames.includes('deleted')) delete selOnesParam.ifDeleted;

    delete selOnesParam.ifDeleted;

    const selOneParam = {
      selKeys: columns.filter(item => item.ifSelOne === base.Y).map(item => baseUtils.toCamelCase(item.colName)),
      ifDeleted: false,
    };
    if (ifDelSelKeys(selOneParam.selKeys)) delete selOneParam.selKeys;
    if (tsNames.includes('deleted')) delete selOneParam.ifDeleted;

    delete selOneParam.ifDeleted;

    const insParam = {
      ifCreateRole: false,
      ifUpdateRole: false,
      ifCreateBy: false,
      ifUpdateBy: false,
      ifCreateTime: false,
      ifUpdateTime: false,
      ifDeleted: false,
    };
    if (tsNames.includes('createRole')) delete insParam.ifCreateRole;
    if (tsNames.includes('updateRole')) delete insParam.ifUpdateRole;
    if (tsNames.includes('createBy')) delete insParam.ifCreateBy;
    if (tsNames.includes('updateBy')) delete insParam.ifUpdateBy;
    if (tsNames.includes('createTime')) delete insParam.ifCreateTime;
    if (tsNames.includes('updateTime')) delete insParam.ifUpdateTime;
    if (tsNames.includes('deleted')) delete insParam.ifDeleted;
    o['ifCreateRole'] = tsNames.includes('createRole');
    o['ifUpdateRole'] = tsNames.includes('updateRole');
    o['ifCreateBy'] = tsNames.includes('createBy');
    o['ifUpdateBy'] = tsNames.includes('updateBy');
    o['ifCreateTime'] = tsNames.includes('createTime');
    o['ifUpdateTime'] = tsNames.includes('updateTime');
    o['ifDeleted'] = tsNames.includes('deleted');

    delete insParam.ifCreateRole;
    delete insParam.ifUpdateRole;
    delete insParam.ifCreateBy;
    delete insParam.ifUpdateBy;
    delete insParam.ifCreateTime;
    delete insParam.ifUpdateTime;
    delete insParam.ifDeleted;

    const inssParam = insParam;

    const updParam = {
      ifUpdateRole: false,
      ifUpdateBy: false,
      ifUpdateTime: false,
      ifDeleted: false,
    };
    if (tsNames.includes('updateRole')) delete updParam.ifUpdateRole;
    if (tsNames.includes('updateBy')) delete updParam.ifUpdateBy;
    if (tsNames.includes('updateTime')) delete updParam.ifUpdateTime;
    if (tsNames.includes('deleted')) delete updParam.ifDeleted;

    delete updParam.ifUpdateRole;
    delete updParam.ifUpdateBy;
    delete updParam.ifUpdateTime;
    delete updParam.ifDeleted;

    const updsParam = updParam;

    function ifDelSelKeys(strs: string[]) {
      return strs.length === 0 || tsNames.filter(item => !baseInterfaceColumns2.includes(item)).every(item => strs.includes(item));
    }

    function _(param) {
      return Object.keys(param).length === 0 ? '' : ', {\n' + Object.keys(param).map(key => {
        if (baseUtils.typeOf(param[key]) === 'string') {
          return `      ${key}: ${param[key]}`;
        }
        if (baseUtils.typeOf(param[key]) === 'boolean') {
          return `      ${key}: ${param[key]}`;
        }
        if (baseUtils.typeOf(param[key]) === 'array') {
          return `      ${key}: [${(param[key] as string[]).map(t => `'${t}'`).join(', ')}]`;
        }
      }).join(',\n') + ',\n    }';
    }

    function __(o) {
      return Object.keys(o).reduce((obj, key) => {
        if (baseUtils.typeOf(o[key]) === 'boolean' && o[key] === true) {
          return obj
        }
        if (baseUtils.typeOf(o[key]) === 'array' && o[key].length === 0) {
          return obj
        }
        return {
          ...obj,
          [key]: o[key]
        }
      }, {})
    }

    return {
      selListParam: _(selListParam),
      selAllParam: _(selAllParam),
      selOnesParam: _(selOnesParam),
      selOneParam: _(selOneParam),
      insParam: _(insParam),
      inssParam: _(inssParam),
      updParam: _(updParam),
      updsParam: _(updsParam),
      _: _(__(o))
    };
  })();
  const qd3_dialogFormDefaultData = [
    [
      (key?: string) => key === 'ifDefault',
      () => 'final.N'
    ],
    [
      (key?: string) => key === 'ifDisabled',
      () => 'final.N'
    ],
    [
      (key?: string) => key === 'parentId',
      () => 'final.DEFAULT_PARENT_ID'
    ],
    [
      (key?: string) => key === 'orderNum',
      () => 'final.DEFAULT_ORDER_NUM'
    ],
    [
      (key?: string) => true,
      () => `''`
    ]
  ]
  const qd3_dialogFormForm = [
    [
      (formType: any, index: number, length: number) => formType === 'inputNumber',
      (tsName: any, index: number, length: number) => {
        const string = `            <el-form-item :label="${moduleName1}Dict.${tsName}" prop="${tsName}">
              <el-input-number v-model="state.dialogForm.${tsName}" controls-position="right"/>
            </el-form-item>`;
        const ifLastAndSingular = index === length - 1 && length % 2 === 1
        return `${index % 2 === 0 ? `        <el-row>
          <el-col :span="${ifLastAndSingular ? 12 : 12}">` : `          <el-col :span="12">`}
${string}
${index % 2 === 1 || ifLastAndSingular ? `          </el-col>
        </el-row>` : `          </el-col>`}`;
      },
      (tsName: any, index: number, length: number) => {
        return `
          <el-table-column prop="${tsName}" :label="${moduleName1}Dict.${tsName}" width="300">
            <template #header>
              <span :class="ifRequired('${tsName}')?'tp-table-header-required':''">{{ ${moduleName1}Dict.${tsName} }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[\`\${$index}-${tsName}\`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].${tsName}" controls-position="right"/>
              </div>
            </template>
          </el-table-column>`;
      }
    ],
    [
      (formType: any, index: number, length: number) => formType === 'textarea',
      (tsName: any, index: number, length: number) => {
        const string = `            <el-form-item :label="${moduleName1}Dict.${tsName}" prop="${tsName}">
              <el-input type="textarea" v-model="state.dialogForm.${tsName}" :placeholder="${moduleName1}Dict.${tsName}"/>
            </el-form-item>`;
        const ifLastAndSingular = index === length - 1 && length % 2 === 1
        return `${index % 2 === 0 ? `        <el-row>
          <el-col :span="${ifLastAndSingular ? 12 : 12}">` : `          <el-col :span="12">`}
${string}
${index % 2 === 1 || ifLastAndSingular ? `          </el-col>
        </el-row>` : `          </el-col>`}`;
      },
      (tsName: any, index: number, length: number) => {
        return `
          <el-table-column prop="${tsName}" :label="${moduleName1}Dict.${tsName}" width="300">
            <template #header>
              <span :class="ifRequired('${tsName}')?'tp-table-header-required':''">{{ ${moduleName1}Dict.${tsName} }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[\`\${$index}-${tsName}\`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].${tsName}" :placeholder="${moduleName1}Dict.${tsName}"/>
              </div>
            </template>
          </el-table-column>`;
      }
    ],
    [
      (formType: any, index: number, length: number) => formType === 'radio',
      (tsName: any, index: number, length: number) => {
        const string = `            <el-form-item :label="${moduleName1}Dict.${tsName}" prop="${tsName}">
              <el-radio-group v-model="state.dialogForm.${tsName}">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>`;
        const ifLastAndSingular = index === length - 1 && length % 2 === 1
        return `${index % 2 === 0 ? `        <el-row>
          <el-col :span="${ifLastAndSingular ? 12 : 12}">` : `          <el-col :span="12">`}
${string}
${index % 2 === 1 || ifLastAndSingular ? `          </el-col>
        </el-row>` : `          </el-col>`}`;
      },
      (tsName: any, index: number, length: number) => {
        return `
          <el-table-column prop="${tsName}" :label="${moduleName1}Dict.${tsName}" width="70">
            <template #header>
              <span :class="ifRequired('${tsName}')?'tp-table-header-required':''">{{ ${moduleName1}Dict.${tsName} }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[\`\${$index}-${tsName}\`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].${tsName}" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>`;
      }
    ],
    [
      (formType: any, index: number, length: number) => formType === 'input' || true,
      (tsName: any, index: number, length: number) => {
        const string = `            <el-form-item :label="${moduleName1}Dict.${tsName}" prop="${tsName}">
              <el-input v-model="state.dialogForm.${tsName}" :placeholder="${moduleName1}Dict.${tsName}"/>
            </el-form-item>`;
        const ifLastAndSingular = index === length - 1 && length % 2 === 1
        return `${index % 2 === 0 ? `        <el-row>
          <el-col :span="${ifLastAndSingular ? 12 : 12}">` : `          <el-col :span="12">`}
${string}
${index % 2 === 1 || ifLastAndSingular ? `          </el-col>
        </el-row>` : `          </el-col>`}`;
      },
      (tsName: any, index: number, length: number) => {
        return `
          <el-table-column prop="${tsName}" :label="${moduleName1}Dict.${tsName}" width="300">
            <template #header>
              <span :class="ifRequired('${tsName}')?'tp-table-header-required':''">{{ ${moduleName1}Dict.${tsName} }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[\`\${$index}-${tsName}\`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].${tsName}" :placeholder="${moduleName1}Dict.${tsName}"/>
              </div>
            </template>
          </el-table-column>`;
      }
    ]
  ]
  const hd1 =
`${`import { BaseDto } from '../../../../${isBusiness?'../':''}common/dto/BaseDto';`}
${`import { PageDto } from '../../../../${isBusiness?'../':''}common/dto/PageDto';`}
${`import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';`}
${`import { Type } from 'class-transformer';`}
${`import { ApiProperty } from '@nestjs/swagger';`}
${``}
${`export class ${moduleName2}Dto extends BaseDto {`}
${
      columns
        .filter(item => baseInterfaceColumns.indexOf(item.tsName) === -1)
        .map(column => `  ${column.tsName}: ${column.tsType};`)
        .join('\n\n')
    }
${`}`}
${``}
${`export class ${moduleName2}SelListDto extends PageDto {`}
${
      columns
        .filter(item => item.ifSelMore === base.Y)
        .map(column => `  @ApiProperty({ description: '${column.colDescr}', required: false })\n  ${column.tsName}: ${column.tsType};`)
        .join('\n\n')
    }
${`}`}
${``}
${`export class ${moduleName2}SelAllDto {`}
${
      columns
        .filter(item => item.ifSelMore === base.Y)
        .map(column => `  @ApiProperty({ description: '${column.colDescr}', required: false })\n  ${column.tsName}: ${column.tsType};`)
        .join('\n\n')
    }
${`}`}
${``}
${`export class ${moduleName2}InsOneDto {`}
${
      columns
        .filter(item => item.ifIns === base.Y)
        .map(column => {
          let str: string = ''
          str += `  @ApiProperty({ description: '${column.colDescr}', required: ${column.ifRequired === base.Y} })\n`
          if (column.tsType === 'number') {
            str += `  @Type(() => Number)\n`
          }
          if (column.ifRequired === base.Y) {
            str += `  @IsNotEmpty({ message: '${column.colDescr}不能为空' })\n`
          }
          if (column.tsType === 'string' && column.mysqlLength > 0) {
            if (column.ifRequired !== base.Y) {
              str += '  @IsOptional()\n';
            }
            str += `  @MaxLength(${column.mysqlLength}, { message: '${column.colDescr}不能超过${column.mysqlLength}个字符' })\n`
          }
          str += `  ${column.tsName}: ${column.tsType};`
          return str
        })
        .join('\n\n')
    }
${`}`}
${``}
${`export class ${moduleName2}UpdOneDto extends ${moduleName2}InsOneDto {`}
${`  @ApiProperty({ description: '主键id', required: true })`}
${`  @IsNotEmpty({ message: '主键id不能为空' })`}
${`  id: ${columns.find(item => item.colName === 'id').tsType};`}
${`}`}
${``}
${`export class ${moduleName2}InsMoreDto {`}
${`  @IsArray()`}
${`  @ValidateNested({ each: true })`}
${`  @Type(() => ${moduleName2}InsOneDto)`}
${`  items: ${moduleName2}InsOneDto[];`}
${`}`}
${``}
${`export class ${moduleName2}UpdMoreDto {`}
${`  @IsArray()`}
${`  @ValidateNested({ each: true })`}
${`  @Type(() => ${moduleName2}UpdOneDto)`}
${`  items: ${moduleName2}UpdOneDto[];`}
${`}`}
`;
  const hd2 =
`${`import { Injectable } from '@nestjs/common';`}
${`import { PrismaService } from '../../../../${isBusiness?'../':''}prisma/prisma.service';`}
${`import { R } from '../../../../${isBusiness?'../':''}common/R';`}
${`import { ${moduleName2}Dto, ${moduleName2}SelListDto, ${moduleName2}SelAllDto, ${moduleName2}InsOneDto, ${moduleName2}UpdOneDto } from './dto';`}
${`import { BaseContextService } from '../../../${isBusiness?'../':''}base-context/base-context.service';`}
${``}
${`@Injectable()`}
${`export class ${moduleName2}Service {`}
${`  constructor(`}
${`    private readonly prisma: PrismaService,`}
${`    private readonly bcs: BaseContextService,`}
${`  ) {`}
${`    this.bcs.setFieldSelectParam('${table.tableName}'${hd2_prismaConfig._});`}
${`  }`}
${``}
${`  async sel${moduleName2}(dto: ${moduleName2}SelListDto): Promise<R> {`}
${`    const res = await this.prisma.findPage<${moduleName2}Dto, ${moduleName2}SelListDto>('${table.tableName}'${hd2_prismaConfig.selListParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async selAll${moduleName2}(dto: ${moduleName2}SelAllDto): Promise<R> {`}
${`    const res = await this.prisma.findAll<${moduleName2}Dto>('${table.tableName}'${hd2_prismaConfig.selAllParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async selOnes${moduleName2}(ids: number[]): Promise<R> {`}
${`    const res = await this.prisma.findByIds<${moduleName2}Dto>('${table.tableName}', Object.values(ids).map(n => Number(n))${hd2_prismaConfig.selOnesParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async selOne${moduleName2}(id: number): Promise<R> {`}
${`    const res = await this.prisma.findById<${moduleName2}Dto>('${table.tableName}', Number(id)${hd2_prismaConfig.selOneParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async ins${moduleName2}(dto: ${moduleName2}InsOneDto): Promise<R> {`}
${`    const res = await this.prisma.create<${moduleName2}Dto>('${table.tableName}', dto${hd2_prismaConfig.insParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async ins${moduleName2}s(dtos: ${moduleName2}InsOneDto[]): Promise<R> {`}
${`    const res = await this.prisma.createMany<${moduleName2}Dto>('${table.tableName}', dtos${hd2_prismaConfig.inssParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async upd${moduleName2}(dto: ${moduleName2}UpdOneDto): Promise<R> {`}
${`    const res = await this.prisma.updateById<${moduleName2}Dto>('${table.tableName}', dto${hd2_prismaConfig.updParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async upd${moduleName2}s(dtos: ${moduleName2}UpdOneDto[]): Promise<R> {`}
${`    const res = await this.prisma.updateMany<${moduleName2}Dto>('${table.tableName}', dtos${hd2_prismaConfig.updsParam});`}
${`    return R.ok(res);`}
${`  }`}
${``}
${`  async del${moduleName2}(ids: number[]): Promise<R> {`}
${`    const res = await this.prisma.deleteById<${moduleName2}Dto>('${table.tableName}', ids);`}
${`    return R.ok(res);`}
${`  }`}
${`}`}
`;
  const hd3 =
`${`import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';`}
${`import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';`}
${`import { ${moduleName2}Service } from './${moduleName3}.service';`}
${`import { Authorize } from '../../../../${isBusiness?'../':''}decorator/authorize.decorator';`}
${`import { R } from '../../../../${isBusiness?'../':''}common/R';`}
${`import { ${moduleName2}SelListDto, ${moduleName2}SelAllDto, ${moduleName2}InsOneDto, ${moduleName2}UpdOneDto, ${moduleName2}InsMoreDto, ${moduleName2}UpdMoreDto } from './dto';`}
${``}
${`@Controller('/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}')`}
${`@ApiTags('${sys.name}${isBusiness?`/${table.businessNameCn}`:''}/${table.moduleNameCn}')`}
${`@ApiBearerAuth()`}
${`@UsePipes(new ValidationPipe({ transform: true }))`}
${`export class ${moduleName2}Controller {`}
${`  constructor(private readonly ${moduleName1}Service: ${moduleName2}Service) {`}
${`  }`}
${``}
${`  @Get()`}
${`  @ApiOperation({`}
${`    summary: '分页查询${table.moduleNameCn}',`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:selList',`}
${`    label: '分页查询${table.moduleNameCn}',`}
${`  })`}
${`  async sel${moduleName2}(@Query() dto: ${moduleName2}SelListDto): Promise<R> {`}
${`    return this.${moduleName1}Service.sel${moduleName2}(dto);`}
${`  }`}
${``}
${`  @Get('/all')`}
${`  @ApiOperation({`}
${`    summary: '查询所有${table.moduleNameCn}',`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:selAll',`}
${`    label: '查询所有${table.moduleNameCn}',`}
${`  })`}
${`  async selAll${moduleName2}(@Query() dto: ${moduleName2}SelAllDto): Promise<R> {`}
${`    return this.${moduleName1}Service.selAll${moduleName2}(dto);`}
${`  }`}
${``}
${`  @Get('/ids')`}
${`  @ApiOperation({`}
${`    summary: '查询多个${table.moduleNameCn}（根据id）',`}
${`  })`}
${`  @ApiQuery({`}
${`    name: 'ids',`}
${`    description: 'id列表',`}
${`    isArray: true,`}
${`    type: Number,`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:selOnes',`}
${`    label: '查询多个${table.moduleNameCn}（根据id）',`}
${`  })`}
${`  async selOnes${moduleName2}(@Query() ids: number[]): Promise<R> {`}
${`    return this.${moduleName1}Service.selOnes${moduleName2}(ids);`}
${`  }`}
${``}
${`  @Get('/:id')`}
${`  @ApiOperation({`}
${`    summary: '查询单个${table.moduleNameCn}',`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:selOne',`}
${`    label: '查询单个${table.moduleNameCn}',`}
${`  })`}
${`  async selOne${moduleName2}(@Param('id') id: number): Promise<R> {`}
${`    return this.${moduleName1}Service.selOne${moduleName2}(id);`}
${`  }`}
${``}
${`  @Post()`}
${`  @ApiOperation({`}
${`    summary: '新增${table.moduleNameCn}',`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:ins',`}
${`    label: '新增${table.moduleNameCn}',`}
${`  })`}
${`  async ins${moduleName2}(@Body() dto: ${moduleName2}InsOneDto): Promise<R> {`}
${`    return this.${moduleName1}Service.ins${moduleName2}(dto);`}
${`  }`}
${``}
${`  @Post('/s')`}
${`  @ApiOperation({`}
${`    summary: '批量新增${table.moduleNameCn}',`}
${`  })`}
${`  @ApiBody({`}
${`    isArray: true,`}
${`    type: ${moduleName2}InsOneDto,`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:inss',`}
${`    label: '批量新增${table.moduleNameCn}',`}
${`  })`}
${`  async ins${moduleName2}s(@Body() dto: ${moduleName2}InsMoreDto): Promise<R> {`}
${`    return this.${moduleName1}Service.ins${moduleName2}s(dto.items);`}
${`  }`}
${``}
${`  @Put()`}
${`  @ApiOperation({`}
${`    summary: '修改${table.moduleNameCn}',`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:upd',`}
${`    label: '修改${table.moduleNameCn}',`}
${`  })`}
${`  async upd${moduleName2}(@Body() dto: ${moduleName2}UpdOneDto): Promise<R> {`}
${`    return this.${moduleName1}Service.upd${moduleName2}(dto);`}
${`  }`}
${``}
${`  @Put('/s')`}
${`  @ApiOperation({`}
${`    summary: '批量修改${table.moduleNameCn}',`}
${`  })`}
${`  @ApiBody({`}
${`    isArray: true,`}
${`    type: ${moduleName2}UpdOneDto,`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:upds',`}
${`    label: '批量修改${table.moduleNameCn}',`}
${`  })`}
${`  async upd${moduleName2}s(@Body() dto: ${moduleName2}UpdMoreDto): Promise<R> {`}
${`    return this.${moduleName1}Service.upd${moduleName2}s(dto.items);`}
${`  }`}
${``}
${`  @Delete()`}
${`  @ApiOperation({`}
${`    summary: '删除${table.moduleNameCn}',`}
${`  })`}
${`  @ApiBody({`}
${`    isArray: true,`}
${`    type: Number,`}
${`  })`}
${`  @Authorize({`}
${`    permission: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}:del',`}
${`    label: '删除${table.moduleNameCn}',`}
${`  })`}
${`  async del${moduleName2}(@Body() ids: number[]): Promise<R> {`}
${`    return this.${moduleName1}Service.del${moduleName2}(ids);`}
${`  }`}
${`}`}
`;
  const hd4 =
`${`import { Module } from '@nestjs/common';`}
${`import { ${moduleName2}Controller } from './${moduleName3}.controller';`}
${`import { ${moduleName2}Service } from './${moduleName3}.service';`}
${``}
${`@Module({`}
${`  controllers: [${moduleName2}Controller],`}
${`  providers: [${moduleName2}Service],`}
${`})`}
${`export class ${moduleName2}Module {`}
${`}`}
`;
  const hd5 =
`在 app.module.ts 中，导入 module 文件，并在 @module().imports 中添加，具体语句如下：
import { ${moduleName2}Module } from './module/${businessName3}/${moduleName3}/${moduleName3}.module';
${moduleName2}Module
`;
  const qd1 =
`${`import { BaseClass, PageDto } from "@/type/tablePage.ts";`}
${``}
${`export class ${moduleName2}Dto extends BaseClass {`}
${
  columns
    .filter(column => baseInterfaceColumns.indexOf(column.tsName) === -1)
    .map(column => `  ${column.tsName}!: ${column.tsType};`)
    .join('\n')
}
${`}`}
${``}
${`export class ${moduleName2}SelDto extends PageDto {`}
${`}`}
${``}
${`export class ${moduleName2}SelAllDto {`}
${`}`}
${``}
${`export class ${moduleName2}InsDto {`}
${
    columns
      .filter(item => item.ifIns === base.Y)
      .map(column => `  ${column.tsName}!: ${column.tsType};`)
      .join('\n')
  }
${`}`}
${``}
${`export class ${moduleName2}UpdDto extends ${moduleName2}InsDto {`}
${`  id!: ${columns.find(item => item.colName === 'id').tsType};`}
${`}`}
`;
  const qd2 =
`${`import { publicDict } from "@/utils/base.ts";`}
${`import { ${moduleName2}Dto } from "@/type/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}.ts";`}
${``}
${`export const ${moduleName1}Dict: { [P in keyof ${moduleName2}Dto]: string } = {`}
${`  ...publicDict,`}
${
    columns
      .filter(item=>Object.keys(publicDict).indexOf(item.tsName)===-1)
      .map(item=>`  ${item.tsName}: '${item.colDescr}',`)
      .join('\n')
  }
${`}`}
`;
  const qd3 =
`${`import request from "@/api/request.ts";`}
${`import { ApiConfig } from "@/type/tablePage.ts";`}
${`import { ${moduleName2}Dto, ${moduleName2}UpdDto } from "@/type/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}.ts";`}
${``}
${`export const ${moduleName1}Api: ApiConfig<${moduleName2}Dto, ${moduleName2}UpdDto> = {`}
${`  /**`}
${`   * 分页查询`}
${`   * @param params`}
${`   */`}
${`  selectList: (params) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}',`}
${`    method: 'GET',`}
${`    params: params`}
${`  }),`}
${`  /**`}
${`   * 查询所有`}
${`   * @param params`}
${`   */`}
${`  selectAll: (params) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}/all',`}
${`    method: 'GET',`}
${`    params: params`}
${`  }),`}
${`  /**`}
${`   * 查询单个`}
${`   * @param id`}
${`   */`}
${`  selectById: (id) => request({`}
${`    url: \`/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}/\${id}\`,`}
${`    method: 'GET'`}
${`  }),`}
${`  /**`}
${`   * 查询多个`}
${`   * @param ids`}
${`   */`}
${`  selectByIds: (ids) => request({`}
${`    url: \`/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}/ids\`,`}
${`    method: 'GET',`}
${`    params: ids`}
${`  }),`}
${`  /**`}
${`   * 新增`}
${`   * @param obj`}
${`   */`}
${`  insertOne: (obj) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}',`}
${`    method: 'POST',`}
${`    data: obj`}
${`  }),`}
${`  /**`}
${`   * 修改`}
${`   * @param obj`}
${`   */`}
${`  updateOne: (obj) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}',`}
${`    method: 'PUT',`}
${`    data: obj`}
${`  }),`}
${`  /**`}
${`   * 新增多个`}
${`   * @param objs`}
${`   */`}
${`  insertMore: (objs) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}/s',`}
${`    method: 'POST',`}
${`    data: {`}
${`      items: objs,`}
${`    }`}
${`  }),`}
${`  /**`}
${`   * 修改多个`}
${`   * @param objs`}
${`   */`}
${`  updateMore: (objs) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}/s',`}
${`    method: 'PUT',`}
${`    data: {`}
${`      items: objs,`}
${`    }`}
${`  }),`}
${`  /**`}
${`   * 删除`}
${`   * @param ids`}
${`   */`}
${`  deleteList: (...ids) => request({`}
${`    url: '/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}',`}
${`    method: 'DELETE',`}
${`    data: ids`}
${`  })`}
${`}`}
`;
  const qd4 =
`${`<script lang="ts">`}
${`export default {`}
${`  name: '${sysPath}${isBusiness?`:${businessName1}`:''}:${moduleName1}'`}
${`}`}
${`</script>`}
` + `
${`<script setup lang="ts">`}
${`import { reactive } from "vue";`}
${`import { CONFIG, final } from "@/utils/base.ts";`}
${`import Pagination from "@/components/pagination/pagination.vue";`}
${`import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";`}
${`import { State2, TablePageConfig } from "@/type/tablePage.ts";`}
${`import { FormRules } from "element-plus";`}
${`import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";`}
${`import { ${moduleName2}Dto, ${moduleName2}UpdDto } from "@/type/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}.ts";`}
${`import { ${moduleName1}Api } from "@/api/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}.ts";`}
${`import { ${moduleName1}Dict } from "@/dict/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}.ts";`}
${``}
${`const state = reactive<State2<${moduleName2}Dto, ${moduleName2}UpdDto>>({`}
${`  dialogForm: {`}
${`    id: ${columns.find(item => item.colName === 'id').tsType === 'number' ? -1 : ''},`}
${
    columns
      .filter(item => item.ifIns === base.Y)
      .map(column => `    ${column.tsName}: ${qd3_dialogFormDefaultData.find(funcs => funcs[0](column.tsName))[1]()},`)
      .join('\n')
  }
${`  },`}
${`  dialogForms: [],`}
${`  dialogForms_error: {},`}
${`  filterForm: {},`}
${`})`}
${`const dFormRules: FormRules = {`}
${
    columns
      .filter(item=>item.ifRequired===base.Y)
      .map(item=>`  ${item.tsName}: [{required: true, trigger: 'change'}],`)
      .join('\n')
  }
${`}`}
${`const config = new TablePageConfig({`}
${`  bulkOperation: true,`}
${`})`}
${``}
${`const {`}
${`  dialogFormRef,`}
${`  dialogFormsRef,`}
${`  filterFormRef,`}
${`  filterFormVisible1,`}
${`  filterFormVisible,`}
${`  dialogVisible,`}
${`  dialogLoadingRef,`}
${`  dialogButtonLoadingRef,`}
${`  tableLoadingRef,`}
${`  switchLoadingRef,`}
${`  activeTabName,`}
${`  tableData,`}
${`  pageParam,`}
${`  total,`}
${`  multipleSelection,`}
${`  dialogType,`}
${`  refresh,`}
${`  dCan,`}
${`  dCon,`}
${`  fEnter,`}
${`  fCon,`}
${`  fCan,`}
${`  gRefresh,`}
${`  gIns,`}
${`  gUpd,`}
${`  gDel,`}
${`  gExport,`}
${`  gImport,`}
${`  gChangeFilterFormVisible,`}
${`  tUpd,`}
${`  tDel,`}
${`  handleSelectionChange,`}
${`  pageChange,`}
${`  dfIns,`}
${`  dfDel,`}
${`  ifRequired,`}
${`} = funcTablePage<${moduleName2}Dto, ${moduleName2}UpdDto>({`}
${`  state,`}
${`  dFormRules,`}
${`  config,`}
${`  api: ${moduleName1}Api,`}
${`  dict: ${moduleName1}Dict,`}
${`})`}
${`</script>`}
` + `
${`<template>`}
${`  <!--弹窗-->`}
${`  <el-dialog`}
${`      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"`}
${`      v-model="dialogVisible"`}
${`      :title="dialogType.label"`}
${`      draggable`}
${`      append-to-body`}
${`  >`}
${`    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">`}
${`      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>`}
${`      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>`}
${`    </el-tabs>`}
${`    <template v-if="activeTabName===final.one">`}
${`      <el-form`}
${`          ref="dialogFormRef"`}
${`          v-loading="dialogLoadingRef"`}
${`          :model="state.dialogForm"`}
${`          :label-width="CONFIG.dialog_form_label_width"`}
${`          :rules="dFormRules"`}
${`      >`}
${`        <!--<el-row>-->`}
${`        <!--  <el-col :span="12"></el-col>-->`}
${`        <!--  <el-col :span="12"></el-col>-->`}
${`        <!--</el-row>-->`}
${`        <el-form-item v-if="dialogType.value!==final.ins" :label="${moduleName1}Dict.id" prop="id">`}
${`          <span>{{ state.dialogForm.id }}</span>`}
${`        </el-form-item>`}
${`        <!--在此下方添加表单项-->`}
${
    [
      ...columns
        .filter(item => item.ifIns === base.Y)
        .filter(item => item.tsName !== 'remark')
        .map((item, index) => `${qd3_dialogFormForm.find(funcs => funcs[0](item.formType, 0, 0))[1](
          item.tsName,
          index,
          columns.filter(item => item.ifIns === base.Y).filter(item => item.tsName !== 'remark').length)}`
        ),
      ...columns
        .filter(item => item.ifIns === base.Y)
        .filter(item => item.tsName === 'remark')
        .map(() => `        <el-row>
          <el-col :span="24">
            <el-form-item :label="${moduleName1}Dict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="${moduleName1}Dict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>`)
    ]
      .join('\n')
  }
${`        <!--在此上方添加表单项-->`}
${`        <!--<el-form-item :label="${moduleName1}Dict.orderNum" prop='orderNum'>-->`}
${`        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->`}
${`        <!--</el-form-item>-->`}
${`        <!--<el-form-item :label="${moduleName1}Dict.ifDefault" prop='ifDefault'>-->`}
${`        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->`}
${`        <!--</el-form-item>-->`}
${`        <!--<el-form-item :label="${moduleName1}Dict.ifDisabled" prop='ifDisabled'>-->`}
${`        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->`}
${`        <!--    <el-radio :value="final.Y">是</el-radio>-->`}
${`        <!--    <el-radio :value="final.N">否</el-radio>-->`}
${`        <!--  </el-radio-group>-->`}
${`        <!--</el-form-item>-->`}
${`        <!--<el-form-item :label="${moduleName1}Dict.ifDisabled" prop="ifDisabled">-->`}
${`        <!--  <el-switch v-model="state.dialogForm.ifDisabled" :active-value="final.N" :inactive-value="final.Y"/>-->`}
${`        <!--</el-form-item>-->`}
${`        <!--上方几个酌情使用-->`}
${`      </el-form>`}
${`    </template>`}
${`    <template v-if="activeTabName===final.more">`}
${`      <el-form`}
${`          ref="dialogFormsRef"`}
${`          v-loading="dialogLoadingRef"`}
${`      >`}
${`        <el-table`}
${`            :data="state.dialogForms"`}
${`            v-if="state.dialogForms"`}
${`        >`}
${`          <el-table-column type="index" width="50">`}
${`            <template #header>`}
${`              #`}
${`            </template>`}
${`          </el-table-column>`}
${`          <!--在此下方添加表格列-->`}${
    columns
      .filter(item => item.ifIns === base.Y)
      .map((item, index) => `${qd3_dialogFormForm.find(funcs => funcs[0](item.formType, 0, 0))[2](item.tsName, index, columns.filter(item => item.ifIns === base.Y).length)}`)
      .join('')
  }
${`          <!--在此上方添加表格列-->`}
${`          <el-table-column fixed="right" label="操作" min-width="120">`}
${`            <template v-if="dialogType.value===final.ins" #default="{$index}">`}
${`              <el-button link type="danger" size="small" :icon="Delete" @click="dfDel($index)">删除</el-button>`}
${`            </template>`}
${`          </el-table-column>`}
${`          <template v-if="dialogType.value===final.ins" #append>`}
${`            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>`}
${`          </template>`}
${`        </el-table>`}
${`      </el-form>`}
${`    </template>`}
${`    <template #footer>`}
${`      <span class="dialog-footer">`}
${`        <el-button :disabled="dialogButtonLoadingRef" @click="dCan">取消</el-button>`}
${`        <el-button type="primary" :disabled="dialogButtonLoadingRef" @click="dCon">确认</el-button>`}
${`      </span>`}
${`    </template>`}
${`  </el-dialog>`}
${``}
${`  <!--顶部筛选表单-->`}
${`  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">`}
${`    <el-form`}
${`        class="demo-form-inline"`}
${`        ref="filterFormRef"`}
${`        :model="state.filterForm"`}
${`        :inline="true"`}
${`        @keyup.enter="fEnter"`}
${`    >`}
${`      <!--在此下方添加表单项-->`}
${`      <!--<el-form-item :label="${moduleName1}Dict." prop="">-->`}
${`      <!--  <el-input v-model="state.filterForm." :placeholder="${moduleName1}Dict."/>-->`}
${`      <!--</el-form-item>-->`}
${`      <!--在此上方添加表单项-->`}
${`      <el-form-item>`}
${`        <el-button type="primary" @click="fCon">筛选</el-button>`}
${`        <el-button @click="fCan">重置</el-button>`}
${`      </el-form-item>`}
${`    </el-form>`}
${`  </div>`}
${``}
${`  <!--操作按钮-->`}
${`  <div class="zs-button-row">`}
${`    <div>`}
${`      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>`}
${`      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>`}
${`      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>`}
${`      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>`}
${`      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>`}
${`      <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>`}
${`    </div>`}
${`    <div>`}
${`      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>`}
${`    </div>`}
${`  </div>`}
${``}
${`  <div class="zs-table-data">`}
${`    <!--数据表格-->`}
${`    <el-table`}
${`        v-loading="tableLoadingRef"`}
${`        :data="tableData"`}
${`        @selection-change="handleSelectionChange"`}
${`    >`}
${`      <el-table-column fixed type="selection" width="55"/>`}
${`      <!--<el-table-column fixed prop="id" :label="${moduleName1}Dict.id" width="180"/>-->`}
${`      <!--上面id列的宽度改一下-->`}
${`      <!--在此下方添加表格列-->`}
${
    columns
      .filter(item => item.ifSelMore === base.Y)
      .map(item => `      <el-table-column prop="${item.tsName}" :label="${moduleName1}Dict.${item.tsName}" width="120"/>`,
      )
      .join('\n')
  }
${`      <!--在此上方添加表格列-->`}
${`      <!--<el-table-column prop="createRole" :label="${moduleName1}Dict.createRole" width="120"/>-->`}
${`      <!--<el-table-column prop="updateRole" :label="${moduleName1}Dict.updateRole" width="120"/>-->`}
${`      <!--<el-table-column prop="createBy" :label="${moduleName1}Dict.createBy" width="120"/>-->`}
${`      <!--<el-table-column prop="updateBy" :label="${moduleName1}Dict.updateBy" width="120"/>-->`}
${`      <!--<el-table-column prop="createTime" :label="${moduleName1}Dict.createTime" width="220"/>-->`}
${`      <!--<el-table-column prop="updateTime" :label="${moduleName1}Dict.updateTime" width="220"/>-->`}
${`      <!--<el-table-column prop="deleted" :label="${moduleName1}Dict.deleted" width="60"/>-->`}
${`      <!--上方几个酌情使用-->`}
${`      <el-table-column fixed="right" label="操作" min-width="140">`}
${`        <template #default="{row}">`}
${`          <div class="zs-table-data-operate-button-row">`}
${`            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>`}
${`            <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>`}
${`          </div>`}
${`        </template>`}
${`      </el-table-column>`}
${`      <template #append>`}
${`        <div class="el-table-append-box">`}
${`          <span>此表格的多选<span class="underline">不支持</span>{{ \`跨分页保存，当前已选 \${multipleSelection.length} 条数据。\` }}</span>`}
${`        </div>`}
${`      </template>`}
${`    </el-table>`}
${``}
${`    <!--分页-->`}
${`    <Pagination`}
${`        v-if="config.pageQuery"`}
${`        :total="total"`}
${`        :page-num="pageParam.pageNum"`}
${`        :page-size="pageParam.pageSize"`}
${`        @page-change="pageChange"`}
${`    />`}
${`  </div>`}
${`</template>`}
` + `
${`<style scoped>`}
${`</style>`}
`;
  return [
    {
      fileName: `dto.ts`,
      filePath: `/src/module/module/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}`,
      canCopy: true,
      code: hd1,
    },
    {
      fileName: `${moduleName3}.service.ts`,
      filePath: `/src/module/module/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}`,
      canCopy: true,
      code: hd2,
    },
    {
      fileName: `${moduleName3}.controller.ts`,
      filePath: `/src/module/module/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}`,
      canCopy: true,
      code: hd3,
    },
    {
      fileName: `${moduleName3}.module.ts`,
      filePath: `/src/module/module/${sysPath}${isBusiness?`/${businessName3}`:''}/${moduleName3}`,
      canCopy: true,
      code: hd4,
    },
    // {
    //   fileName: `app.module.ts`,
    //   filePath: `/src`,
    //   canCopy: false,
    //   code: hd5,
    // },
    {
      fileName: `${moduleName1}.ts`,
      filePath: `/src/type/module/${sysPath}${isBusiness?`/${businessName1}`:''}`,
      canCopy: true,
      code: qd1,
    },
    {
      fileName: `${moduleName1}.ts`,
      filePath: `/src/dict/module/${sysPath}${isBusiness?`/${businessName1}`:''}`,
      canCopy: true,
      code: qd2,
    },
    {
      fileName: `${moduleName1}.ts`,
      filePath: `/src/api/module/${sysPath}${isBusiness?`/${businessName1}`:''}`,
      canCopy: true,
      code: qd3,
    },
    {
      fileName: `index.vue`,
      filePath: `/src/views/module/${sysPath}${isBusiness?`/${businessName1}`:''}/${moduleName1}`,
      canCopy: true,
      code: qd4,
    },
  ];
}
