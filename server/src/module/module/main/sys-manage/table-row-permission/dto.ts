import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
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
  actionType: string;

  @ApiProperty({ description: '作用id', required: true })
  @IsNotEmpty({ message: '作用id不能为空' })
  actionId: string;

  @ApiProperty({ description: '数据类型', required: true })
  @IsNotEmpty({ message: '数据类型不能为空' })
  dataType: string;
}

export class TableRowPermissionUpdOneDto extends TableRowPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
