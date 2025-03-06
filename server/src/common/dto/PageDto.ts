import { Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({ description: 'pageNum', required: true })
  @Type(() => Number)
  @Min(1, { message: 'pageNum最小值为1' })
  pageNum: number;

  @ApiProperty({ description: 'pageSize', required: true })
  @Type(() => Number)
  @Min(1, { message: 'pageSize最小值为1' })
  pageSize: number;
}
