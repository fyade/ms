import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DicDataService } from './dic-data.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { DicDataSelListDto, DicDataSelAllDto, DicDataInsOneDto, DicDataUpdOneDto, DicDataInsMoreDto, DicDataUpdMoreDto } from './dto';

@Controller('/main/sys-manage/dic-data')
@ApiTags('主系统/系统管理/字典数据')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class DicDataController {
  constructor(private readonly dicDataService: DicDataService) {
  }

  @Get('/perm/:perm')
  @ApiOperation({
    summary: '获取某类型下的字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:selDataOfPerm',
    label: '获取某类型下的字典数据',
  })
  async selDicDataOfType(@Param('perm') perm: string) {
    return this.dicDataService.selDicDataOfType(perm);
  }

  @Get()
  @ApiOperation({
    summary: '分页查询字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:selList',
    label: '分页查询字典数据',
  })
  async selDicData(@Query() dto: DicDataSelListDto): Promise<R> {
    return this.dicDataService.selDicData(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:selAll',
    label: '查询所有字典数据',
  })
  async selAllDicData(@Query() dto: DicDataSelAllDto): Promise<R> {
    return this.dicDataService.selAllDicData(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个字典数据（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dicData:selOnes',
    label: '查询多个字典数据（根据id）',
  })
  async selOnesDicData(@Query() ids: number[]): Promise<R> {
    return this.dicDataService.selOnesDicData(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:selOne',
    label: '查询单个字典数据',
  })
  async selOneDicData(@Param('id') id: number): Promise<R> {
    return this.dicDataService.selOneDicData(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:ins',
    label: '新增字典数据',
  })
  async insDicData(@Body() dto: DicDataInsOneDto): Promise<R> {
    return this.dicDataService.insDicData(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增字典数据',
  })
  @ApiBody({
    isArray: true,
    type: DicDataInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dicData:inss',
    label: '批量新增字典数据',
  })
  async insDicDatas(@Body() dto: DicDataInsMoreDto): Promise<R> {
    return this.dicDataService.insDicDatas(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改字典数据',
  })
  @Authorize({
    permission: 'main:sysManage:dicData:upd',
    label: '修改字典数据',
  })
  async updDicData(@Body() dto: DicDataUpdOneDto): Promise<R> {
    return this.dicDataService.updDicData(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改字典数据',
  })
  @ApiBody({
    isArray: true,
    type: DicDataUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dicData:upds',
    label: '批量修改字典数据',
  })
  async updDicDatas(@Body() dto: DicDataUpdMoreDto): Promise<R> {
    return this.dicDataService.updDicDatas(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除字典数据',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dicData:del',
    label: '删除字典数据',
  })
  async delDicData(@Body() ids: number[]): Promise<R> {
    return this.dicDataService.delDicData(ids);
  }
}
