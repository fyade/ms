import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MenuThrottleDto extends BaseDto {
  id: number;

  menuId: number;

  ttl: number;

  limit: number;

  type: string;

  remark: string;
}

export class MenuThrottleSelListDto extends PageDto {
  @ApiProperty({ description: '菜单', required: false })
  menuId: number;

  @ApiProperty({ description: '单位时长(ms)', required: false })
  ttl: number;

  @ApiProperty({ description: '次数', required: false })
  limit: number;

  @ApiProperty({ description: '限制类型', required: false })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuThrottleSelAllDto {
  @ApiProperty({ description: '菜单', required: false })
  menuId: number;

  @ApiProperty({ description: '单位时长(ms)', required: false })
  ttl: number;

  @ApiProperty({ description: '次数', required: false })
  limit: number;

  @ApiProperty({ description: '限制类型', required: false })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuThrottleInsOneDto {
  @ApiProperty({ description: '菜单', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '菜单不能为空' })
  menuId: number;

  @ApiProperty({ description: '单位时长(ms)', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '单位时长(ms)不能为空' })
  ttl: number;

  @ApiProperty({ description: '次数', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '次数不能为空' })
  limit: number;

  @ApiProperty({ description: '限制类型', required: true })
  @IsNotEmpty({ message: '限制类型不能为空' })
  type: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class MenuThrottleUpdOneDto extends MenuThrottleInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
