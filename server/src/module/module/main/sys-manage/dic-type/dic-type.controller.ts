import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DicTypeService } from './dic-type.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { DicTypeSelListDto, DicTypeSelAllDto, DicTypeInsOneDto, DicTypeUpdOneDto, DicTypeInsMoreDto, DicTypeUpdMoreDto } from './dto';

@Controller('/main/sys-manage/dic-type')
@ApiTags('主系统/系统管理/字典类型')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class DicTypeController {
  constructor(private readonly dicTypeService: DicTypeService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询字典类型',
  })
  @Authorize({
    permission: 'main:sysManage:dicType:selList',
    label: '分页查询字典类型',
  })
  async selDicType(@Query() dto: DicTypeSelListDto): Promise<R> {
    return this.dicTypeService.selDicType(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有字典类型',
  })
  @Authorize({
    permission: 'main:sysManage:dicType:selAll',
    label: '查询所有字典类型',
  })
  async selAllDicType(@Query() dto: DicTypeSelAllDto): Promise<R> {
    return this.dicTypeService.selAllDicType(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个字典类型（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dicType:selOnes',
    label: '查询多个字典类型（根据id）',
  })
  async selOnesDicType(@Query() ids: number[]): Promise<R> {
    return this.dicTypeService.selOnesDicType(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个字典类型',
  })
  @Authorize({
    permission: 'main:sysManage:dicType:selOne',
    label: '查询单个字典类型',
  })
  async selOneDicType(@Param('id') id: number): Promise<R> {
    return this.dicTypeService.selOneDicType(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增字典类型',
  })
  @Authorize({
    permission: 'main:sysManage:dicType:ins',
    label: '新增字典类型',
  })
  async insDicType(@Body() dto: DicTypeInsOneDto): Promise<R> {
    return this.dicTypeService.insDicType(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增字典类型',
  })
  @ApiBody({
    isArray: true,
    type: DicTypeInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dicType:inss',
    label: '批量新增字典类型',
  })
  async insDicTypes(@Body() dto: DicTypeInsMoreDto): Promise<R> {
    return this.dicTypeService.insDicTypes(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改字典类型',
  })
  @Authorize({
    permission: 'main:sysManage:dicType:upd',
    label: '修改字典类型',
  })
  async updDicType(@Body() dto: DicTypeUpdOneDto): Promise<R> {
    return this.dicTypeService.updDicType(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改字典类型',
  })
  @ApiBody({
    isArray: true,
    type: DicTypeUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dicType:upds',
    label: '批量修改字典类型',
  })
  async updDicTypes(@Body() dto: DicTypeUpdMoreDto): Promise<R> {
    return this.dicTypeService.updDicTypes(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除字典类型',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dicType:del',
    label: '删除字典类型',
  })
  async delDicType(@Body() ids: number[]): Promise<R> {
    return this.dicTypeService.delDicType(ids);
  }
}
