import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeptPermissionDto extends BaseDto {
  id: number;

  deptId: number;

  permissionId: number;
}

export class DeptPermissionSelListDto extends PageDto {
  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '权限id', required: false })
  permissionId: number;
}

export class DeptPermissionSelAllDto {
  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '权限id', required: false })
  permissionId: number;
}

export class DeptPermissionInsOneDto {
  @ApiProperty({ description: '部门id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门id不能为空' })
  deptId: number;

  @ApiProperty({ description: '权限id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '权限id不能为空' })
  permissionId: number;
}

export class DeptPermissionUpdOneDto extends DeptPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class DeptPermissionInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptPermissionInsOneDto)
  items: DeptPermissionInsOneDto[];
}

export class DeptPermissionUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptPermissionUpdOneDto)
  items: DeptPermissionUpdOneDto[];
}

export class DeptPermissionUpdManyDPDto {
  @ApiProperty({ description: '部门id', required: true })
  @IsNotEmpty({ message: '部门id不能为空' })
  deptId: number;

  @ApiProperty({ description: '权限id', required: true })
  @IsArray({ message: '权限id应为数组' })
  permissionId: number[];
}
