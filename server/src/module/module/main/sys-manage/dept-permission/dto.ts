import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeptPermissionDto extends BaseDto {
  id: number;

  deptId: number;

  permissionId: number;
}

export class DeptPermissionSelListDto extends PageDto {
  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '权限', required: false })
  permissionId: number;
}

export class DeptPermissionSelAllDto {
  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '权限', required: false })
  permissionId: number;
}

export class DeptPermissionInsOneDto {
  @ApiProperty({ description: '部门', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门不能为空' })
  deptId: number;

  @ApiProperty({ description: '权限', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '权限不能为空' })
  permissionId: number;
}

export class DeptPermissionUpdOneDto extends DeptPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class DeptPermissionUpdManyDPDto {
  @ApiProperty({ description: '部门', required: true })
  @IsNotEmpty({ message: '部门不能为空' })
  deptId: number;

  @ApiProperty({ description: '权限', required: true })
  @IsArray({ message: '权限应为数组' })
  permissionId: number[];
}
