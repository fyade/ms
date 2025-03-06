import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SysService } from './sys.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { SysSelListDto, SysSelAllDto, SysInsOneDto, SysUpdOneDto } from './dto';

@Controller('/main/sys-manage/sys')
@ApiTags('主系统/系统管理/系统')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class SysController {
  constructor(private readonly sysService: SysService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询系统',
  })
  @Authorize({
    permission: 'main:sysManage:sys:selList',
    label: '分页查询系统',
  })
  async selSys(@Query() dto: SysSelListDto): Promise<R> {
    return this.sysService.selSys(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有系统',
  })
  @Authorize({
    permission: 'main:sysManage:sys:selAll',
    label: '查询所有系统',
  })
  async selAllSys(@Query() dto: SysSelAllDto): Promise<R> {
    return this.sysService.selAllSys(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个系统（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:sys:selOnes',
    label: '查询多个系统（根据id）',
  })
  async selOnesSys(@Query() ids: number[]): Promise<R> {
    return this.sysService.selOnesSys(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个系统',
  })
  @Authorize({
    permission: 'main:sysManage:sys:selOne',
    label: '查询单个系统',
  })
  async selOneSys(@Param('id') id: number): Promise<R> {
    return this.sysService.selOneSys(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增系统',
  })
  @Authorize({
    permission: 'main:sysManage:sys:ins',
    label: '新增系统',
  })
  async insSys(@Body() dto: SysInsOneDto): Promise<R> {
    return this.sysService.insSys(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增系统',
  })
  @ApiBody({
    isArray: true,
    type: SysInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:sys:inss',
    label: '批量新增系统',
  })
  async insSyss(@Body(
    new ParseArrayPipe({
      items: SysInsOneDto,
    }),
  ) dtos: SysInsOneDto[]): Promise<R> {
    return this.sysService.insSyss(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改系统',
  })
  @Authorize({
    permission: 'main:sysManage:sys:upd',
    label: '修改系统',
  })
  async updSys(@Body() dto: SysUpdOneDto): Promise<R> {
    return this.sysService.updSys(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改系统',
  })
  @ApiBody({
    isArray: true,
    type: SysUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:sys:upds',
    label: '批量修改系统',
  })
  async updSyss(@Body(
    new ParseArrayPipe({
      items: SysUpdOneDto,
    }),
  ) dtos: SysUpdOneDto[]): Promise<R> {
    return this.sysService.updSyss(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除系统',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:sys:del',
    label: '删除系统',
  })
  async delSys(@Body() ids: number[]): Promise<R> {
    return this.sysService.delSys(ids);
  }
}
