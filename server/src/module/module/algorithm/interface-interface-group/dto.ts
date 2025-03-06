import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InterfaceInterfaceGroupDto extends BaseDto {
  id: number;

  interfaceId: number;

  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupSelListDto extends PageDto {
  @ApiProperty({ description: '接口', required: false })
  interfaceId: number;

  @ApiProperty({ description: '接口组', required: false })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupSelAllDto {
  @ApiProperty({ description: '接口', required: false })
  interfaceId: number;

  @ApiProperty({ description: '接口组', required: false })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupInsOneDto {
  @ApiProperty({ description: '接口', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口不能为空' })
  interfaceId: number;

  @ApiProperty({ description: '接口组', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口组不能为空' })
  interfaceGroupId: number;
}

export class InterfaceInterfaceGroupUpdOneDto extends InterfaceInterfaceGroupInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class InterfaceInterfaceGroupUpdIIGDto {
  @ApiProperty({ description: '接口', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口不能为空' })
  interfaceId: number;

  @ApiProperty({ description: '接口组', required: true })
  @Type(() => Number)
  @IsArray({ message: '接口组应为数组' })
  interfaceGroupId: number[];
}

export class InterfaceInterfaceGroupUpdIGIDto {
  @ApiProperty({ description: '接口', required: true })
  @Type(() => Number)
  @IsArray({ message: '接口应为数组' })
  interfaceId: number[];

  @ApiProperty({ description: '接口组', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口组不能为空' })
  interfaceGroupId: number;
}
