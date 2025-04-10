import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ViewRealTimeService } from './view-real-time.service';
import { ViewRealTimeSelDirsDto, ViewRealTimeSelFileDto } from './dto';

@Controller('/main/sys-log/view-real-time')
@ApiTags('主系统/系统日志/日志文件')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class ViewRealTimeController {
  constructor(private readonly viewRealTimeService: ViewRealTimeService) {}

  @Get('/dirs')
  @ApiOperation({
    summary: '获取某目录下的子目录及文件',
  })
  @Authorize({
    permission: 'main:sysLog:viewRealTime:dirs',
    label: '获取某目录下的子目录及文件',
  })
  async selDirs(@Query() dto: ViewRealTimeSelDirsDto): Promise<R> {
    return this.viewRealTimeService.selDirs(dto);
  }

  @Get('/file')
  @ApiOperation({
    summary: '获取文件',
  })
  @Authorize({
    permission: 'main:sysLog:viewRealTime:file',
    label: '获取文件',
  })
  async selFile(@Query() dto: ViewRealTimeSelFileDto): Promise<R> {
    return this.viewRealTimeService.selFile(dto);
  }
}
