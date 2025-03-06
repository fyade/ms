import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DicDataDto extends BaseDto {
  id: number;

  label: string;

  value: string;

  dicTypeId: number;

  ifDefault: string;

  ifDisabled: string;

  orderNum: number;

  remark: string;
}

export class DicDataSelListDto extends PageDto {
  @ApiProperty({ description: '标签', required: false })
  label: string;

  @ApiProperty({ description: '值', required: false })
  value: string;

  @ApiProperty({ description: '字典类型', required: false })
  dicTypeId: number;

  @ApiProperty({ description: '是否默认', required: false })
  ifDefault: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class DicDataSelAllDto {
  @ApiProperty({ description: '标签', required: false })
  label?: string;

  @ApiProperty({ description: '值', required: false })
  value?: string;

  @ApiProperty({ description: '字典类型', required: false })
  dicTypeId?: number;

  @ApiProperty({ description: '是否默认', required: false })
  ifDefault?: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled?: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum?: number;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;
}

export class DicDataInsOneDto {
  @ApiProperty({ description: '标签', required: true })
  @IsNotEmpty({ message: '标签不能为空' })
  label: string;

  @ApiProperty({ description: '值', required: true })
  @IsNotEmpty({ message: '值不能为空' })
  value: string;

  @ApiProperty({ description: '字典类型', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '字典类型不能为空' })
  dicTypeId: number;

  @ApiProperty({ description: '是否默认', required: true })
  @IsNotEmpty({ message: '是否默认不能为空' })
  ifDefault: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  ifDisabled: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class DicDataUpdOneDto extends DicDataInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
