import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MenuDto extends BaseDto {
  id: number;

  label: string;

  type: string;

  path: string;

  parentId: number;

  component: string;

  icon: string;

  orderNum: number;

  ifLink: string;

  ifVisible: string;

  ifDisabled: string;

  ifPublic: string;

  ifFixed: string;

  perms: string;

  sysId: number;

  remark: string;
}

export class MenuSelListDto extends PageDto {
  @ApiProperty({ description: '菜单/组件名', required: false })
  label: string;

  @ApiProperty({ description: '菜单类型', required: false })
  type: string;

  @ApiProperty({ description: '菜单路径', required: false })
  path: string;

  @ApiProperty({ description: '父级菜单', required: false })
  parentId: number;

  @ApiProperty({ description: '组件路径', required: false })
  component: string;

  @ApiProperty({ description: '图标', required: false })
  icon: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '是否外链', required: false })
  ifLink: string;

  @ApiProperty({ description: '是否显示', required: false })
  ifVisible: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '是否公共接口', required: false })
  ifPublic: string;

  @ApiProperty({ description: '是否固定', required: false })
  ifFixed: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '所属系统', required: false })
  sysId: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuSelAllDto {
  @ApiProperty({ description: '菜单/组件名', required: false })
  label: string;

  @ApiProperty({ description: '菜单类型', required: false })
  type: string;

  @ApiProperty({ description: '菜单路径', required: false })
  path: string;

  @ApiProperty({ description: '父级菜单', required: false })
  parentId: number;

  @ApiProperty({ description: '组件路径', required: false })
  component: string;

  @ApiProperty({ description: '图标', required: false })
  icon: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '是否外链', required: false })
  ifLink: string;

  @ApiProperty({ description: '是否显示', required: false })
  ifVisible: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '是否公共接口', required: false })
  ifPublic: string;

  @ApiProperty({ description: '是否固定', required: false })
  ifFixed: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '所属系统', required: false })
  sysId: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuInsOneDto {
  @ApiProperty({ description: '菜单/组件名', required: true })
  @IsNotEmpty({ message: '菜单/组件名不能为空' })
  label: string;

  @ApiProperty({ description: '菜单类型', required: true })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  type: string;

  @ApiProperty({ description: '菜单路径', required: true })
  @IsNotEmpty({ message: '菜单路径不能为空' })
  path: string;

  @ApiProperty({ description: '父级菜单', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '父级菜单不能为空' })
  parentId: number;

  @ApiProperty({ description: '组件路径', required: true })
  @IsNotEmpty({ message: '组件路径不能为空' })
  component: string;

  @ApiProperty({ description: '图标', required: true })
  @IsNotEmpty({ message: '图标不能为空' })
  icon: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '是否外链', required: true })
  @IsNotEmpty({ message: '是否外链不能为空' })
  ifLink: string;

  @ApiProperty({ description: '是否显示', required: true })
  @IsNotEmpty({ message: '是否显示不能为空' })
  ifVisible: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  ifDisabled: string;

  @ApiProperty({ description: '是否公共接口', required: true })
  @IsNotEmpty({ message: '是否公共接口不能为空' })
  ifPublic: string;

  @ApiProperty({ description: '是否固定', required: true })
  @IsNotEmpty({ message: '是否固定不能为空' })
  ifFixed: string;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  perms: string;

  @ApiProperty({ description: '所属系统', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '所属系统不能为空' })
  sysId: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuUpdOneDto extends MenuInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
