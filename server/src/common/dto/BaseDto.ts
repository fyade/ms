import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ description: 'createRole', required: false })
  createRole: string;

  @ApiProperty({ description: 'updateRole', required: false })
  updateRole: string;

  @ApiProperty({ description: 'createBy', required: false })
  createBy: string;

  @ApiProperty({ description: 'updateBy', required: false })
  updateBy: string;

  @ApiProperty({ description: 'createTime', required: false })
  createTime: Date;

  @ApiProperty({ description: 'updateTime', required: false })
  updateTime: Date;

  @ApiProperty({ description: 'deleted', required: false })
  deleted: string;
}
