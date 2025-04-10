import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MenuIpWhiteListDto extends BaseDto {
  id: number;

  menuId: number;

  whiteList: string;

  fromType: string;

  type: string;

  remark: string;
}

export class MenuIpWhiteListSelListDto extends PageDto {
  @ApiProperty({ description: '菜单', required: false })
  menuId: number;

  @ApiProperty({ description: '白名单', required: false })
  whiteList: string;

  @ApiProperty({ description: '来源类型', required: false })
  fromType: string;

  @ApiProperty({ description: '白名单类型', required: false })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuIpWhiteListSelAllDto {
  @ApiProperty({ description: '菜单', required: false })
  menuId: number;

  @ApiProperty({ description: '白名单', required: false })
  whiteList: string;

  @ApiProperty({ description: '来源类型', required: false })
  fromType: string;

  @ApiProperty({ description: '白名单类型', required: false })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuIpWhiteListInsOneDto {
  @ApiProperty({ description: '菜单', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '菜单不能为空' })
  menuId: number;

  @ApiProperty({ description: '白名单', required: true })
  @IsNotEmpty({ message: '白名单不能为空' })
  @MaxLength(100, { message: '白名单不能超过100个字符' })
  whiteList: string;

  @ApiProperty({ description: '来源类型', required: true })
  @IsNotEmpty({ message: '来源类型不能为空' })
  @MaxLength(2, { message: '来源类型不能超过2个字符' })
  fromType: string;

  @ApiProperty({ description: '白名单类型', required: true })
  @IsNotEmpty({ message: '白名单类型不能为空' })
  @MaxLength(2, { message: '白名单类型不能超过2个字符' })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class MenuIpWhiteListUpdOneDto extends MenuIpWhiteListInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class MenuIpWhiteListInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuIpWhiteListInsOneDto)
  items: MenuIpWhiteListInsOneDto[];
}

export class MenuIpWhiteListUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuIpWhiteListUpdOneDto)
  items: MenuIpWhiteListUpdOneDto[];
}
