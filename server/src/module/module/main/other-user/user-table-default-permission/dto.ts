import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
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

  @ApiProperty({ description: '权限身份id', required: false })
  permId: number;
}

export class UserTableDefaultPermissionSelAllDto {
  @ApiProperty({ description: '表名', required: false })
  tableName: string;

  @ApiProperty({ description: '权限身份类型', required: false })
  permType: string;

  @ApiProperty({ description: '权限身份id', required: false })
  permId: number;
}

export class UserTableDefaultPermissionInsOneDto {
  @ApiProperty({ description: '表名', required: true })
  @IsNotEmpty({ message: '表名不能为空' })
  @MaxLength(50, { message: '表名不能超过50个字符' })
  tableName: string;

  @ApiProperty({ description: '权限身份类型', required: true })
  @IsNotEmpty({ message: '权限身份类型不能为空' })
  @MaxLength(2, { message: '权限身份类型不能超过2个字符' })
  permType: string;

  @ApiProperty({ description: '权限身份id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '权限身份id不能为空' })
  permId: number;
}

export class UserTableDefaultPermissionUpdOneDto extends UserTableDefaultPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserTableDefaultPermissionInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserTableDefaultPermissionInsOneDto)
  items: UserTableDefaultPermissionInsOneDto[];
}

export class UserTableDefaultPermissionUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserTableDefaultPermissionUpdOneDto)
  items: UserTableDefaultPermissionUpdOneDto[];
}
