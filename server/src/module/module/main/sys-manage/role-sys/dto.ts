import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RoleSysDto extends BaseDto {
  id: number;

  roleId: number;

  sysId: number;
}

export class RoleSysSelListDto extends PageDto {
  @ApiProperty({ description: '角色', required: false })
  roleId: number;

  @ApiProperty({ description: '系统', required: false })
  sysId: number;
}

export class RoleSysSelAllDto {
  @ApiProperty({ description: '角色', required: false })
  roleId: number;

  @ApiProperty({ description: '系统', required: false })
  sysId: number;
}

export class RoleSysInsOneDto {
  @ApiProperty({ description: '角色', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '角色不能为空' })
  roleId: number;

  @ApiProperty({ description: '系统', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '系统不能为空' })
  sysId: number;
}

export class RoleSysUpdOneDto extends RoleSysInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
