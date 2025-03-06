import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SysDto extends BaseDto {
  id: number;

  name: string;

  perms: string;

  orderNum: number;

  path: string;

  ifDisabled: string;

  remark: string;
}

export class SysSelListDto extends PageDto {
  @ApiProperty({ description: '系统名', required: false })
  name: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: false })
  path: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysSelAllDto {
  @ApiProperty({ description: '系统名', required: false })
  name: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: false })
  path: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysInsOneDto {
  @ApiProperty({ description: '系统名', required: true })
  @IsNotEmpty({ message: '系统名不能为空' })
  name: string;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  perms: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: true })
  @IsNotEmpty({ message: 'url路径不能为空' })
  path: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysUpdOneDto extends SysInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
