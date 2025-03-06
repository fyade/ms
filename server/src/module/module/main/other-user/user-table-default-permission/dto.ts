import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserTableDefaultPermissionDto extends BaseDto {
  id: number;

  tableName: string;

  permType: string;

  permId: number;
}

export class UserTableDefaultPermissionSelListDto extends PageDto {
  @ApiProperty({ description: '表名', required: false })
  tableName: string;

  @ApiProperty({ description: '权限身份类型', required: false })
  permType: string;

  @ApiProperty({ description: '权限身份', required: false })
  permId: number;
}

export class UserTableDefaultPermissionSelAllDto {
  @ApiProperty({ description: '表名', required: false })
  tableName: string;

  @ApiProperty({ description: '权限身份类型', required: false })
  permType: string;

  @ApiProperty({ description: '权限身份', required: false })
  permId: number;
}

export class UserTableDefaultPermissionInsOneDto {
  @ApiProperty({ description: '表名', required: true })
  @IsNotEmpty({ message: '表名不能为空' })
  tableName: string;

  @ApiProperty({ description: '权限身份类型', required: true })
  @IsNotEmpty({ message: '权限身份类型不能为空' })
  permType: string;

  @ApiProperty({ description: '权限身份', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '权限身份不能为空' })
  permId: number;
}

export class UserTableDefaultPermissionUpdOneDto extends UserTableDefaultPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
