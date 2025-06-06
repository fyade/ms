import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InterfaceInterfaceGroupDto extends BaseDto {
  id: number;

  interfaceId: number;

  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupSelListDto extends PageDto {
  @ApiProperty({ description: '接口id', required: false })
  interfaceId: number;

  @ApiProperty({ description: '接口组id', required: false })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupSelAllDto {
  @ApiProperty({ description: '接口id', required: false })
  interfaceId: number;

  @ApiProperty({ description: '接口组id', required: false })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupInsOneDto {
  @ApiProperty({ description: '接口id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口id不能为空' })
  interfaceId: number;

  @ApiProperty({ description: '接口组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口组id不能为空' })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupUpdOneDto extends InterfaceInterfaceGroupInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class InterfaceInterfaceGroupInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceInterfaceGroupInsOneDto)
  items: InterfaceInterfaceGroupInsOneDto[];
}

export class InterfaceInterfaceGroupUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceInterfaceGroupUpdOneDto)
  items: InterfaceInterfaceGroupUpdOneDto[];
}

export class InterfaceInterfaceGroupUpdIIGDto {
  @ApiProperty({ description: '接口id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口id不能为空' })
  interfaceId: number;

  @ApiProperty({ description: '接口组id', required: true })
  @IsArray({ message: '接口组id应为数组' })
  interfaceGroupId: number[];
}

export class InterfaceInterfaceGroupUpdIGIDto {
  @ApiProperty({ description: '接口id', required: true })
  @IsArray({ message: '接口id应为数组' })
  interfaceId: number[];

  @ApiProperty({ description: '接口组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口组id不能为空' })
  interfaceGroupId: number;
}
