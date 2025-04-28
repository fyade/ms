import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserApiKeyDto extends BaseDto {
  id: number;

  userId: string;

  userRole: string;

  apiKey: string;

  remark: string;
}

export class UserApiKeySelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '用户身份', required: false })
  userRole: string;

  @ApiProperty({ description: 'apiKey', required: false })
  apiKey: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class UserApiKeySelAllDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '用户身份', required: false })
  userRole: string;

  @ApiProperty({ description: 'apiKey', required: false })
  apiKey: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class UserApiKeyInsOneDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '用户身份', required: true })
  @IsNotEmpty({ message: '用户身份不能为空' })
  @MaxLength(30, { message: '用户身份不能超过30个字符' })
  userRole: string;

  @ApiProperty({ description: 'apiKey', required: true })
  @IsNotEmpty({ message: 'apiKey不能为空' })
  @MaxLength(50, { message: 'apiKey不能超过50个字符' })
  apiKey: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class UserApiKeyUpdOneDto extends UserApiKeyInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserApiKeyInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserApiKeyInsOneDto)
  items: UserApiKeyInsOneDto[];
}

export class UserApiKeyUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserApiKeyUpdOneDto)
  items: UserApiKeyUpdOneDto[];
}
