import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TableRowPermissionDto extends BaseDto {
  id: number;

  permissionId: number;

  actionType: string;

  actionId: string;

  dataType: string;
}

export class TableRowPermissionSelListDto extends PageDto {
  @ApiProperty({ description: '权限id', required: false })
  permissionId: number;

  @ApiProperty({ description: '作用类型', required: false })
  actionType: string;

  @ApiProperty({ description: '作用id', required: false })
  actionId: string;

  @ApiProperty({ description: '数据类型', required: false })
  dataType: string;
}

export class TableRowPermissionSelAllDto {
  @ApiProperty({ description: '权限id', required: false })
  permissionId: number;

  @ApiProperty({ description: '作用类型', required: false })
  actionType: string;

  @ApiProperty({ description: '作用id', required: false })
  actionId: string;

  @ApiProperty({ description: '数据类型', required: false })
  dataType: string;
}

export class TableRowPermissionInsOneDto {
  @ApiProperty({ description: '权限id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '权限id不能为空' })
  permissionId: number;

  @ApiProperty({ description: '作用类型', required: true })
  @IsNotEmpty({ message: '作用类型不能为空' })
  @MaxLength(20, { message: '作用类型不能超过20个字符' })
  actionType: string;

  @ApiProperty({ description: '作用id', required: true })
  @IsNotEmpty({ message: '作用id不能为空' })
  @MaxLength(20, { message: '作用id不能超过20个字符' })
  actionId: string;

  @ApiProperty({ description: '数据类型', required: true })
  @IsNotEmpty({ message: '数据类型不能为空' })
  @MaxLength(20, { message: '数据类型不能超过20个字符' })
  dataType: string;
}

export class TableRowPermissionUpdOneDto extends TableRowPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class TableRowPermissionInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableRowPermissionInsOneDto)
  items: TableRowPermissionInsOneDto[];
}

export class TableRowPermissionUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableRowPermissionUpdOneDto)
  items: TableRowPermissionUpdOneDto[];
}
