import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
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
  @MaxLength(1, { message: '是否允许新用户注册不能超过1个字符' })
  ifAllowUserRegist: string;

  @ApiProperty({ description: '备注', required: false })
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class SysConfigUpdOneDto extends SysConfigInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class SysConfigInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SysConfigInsOneDto)
  items: SysConfigInsOneDto[];
}

export class SysConfigUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SysConfigUpdOneDto)
  items: SysConfigUpdOneDto[];
}
