import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SysConfigDto extends BaseDto {
  id: number;

  ifAllowUserRegist: string;

  remark: string;
}

export class SysConfigSelListDto extends PageDto {
  @ApiProperty({ description: '是否允许新用户注册', required: false })
  ifAllowUserRegist: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysConfigSelAllDto {
  @ApiProperty({ description: '是否允许新用户注册', required: false })
  ifAllowUserRegist: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysConfigInsOneDto {
  @ApiProperty({ description: '是否允许新用户注册', required: true })
  @IsNotEmpty({ message: '是否允许新用户注册不能为空' })
  ifAllowUserRegist: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysConfigUpdOneDto extends SysConfigInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
