import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MenuIpWhiteListService } from './menu-ip-white-list.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { MenuIpWhiteListSelListDto, MenuIpWhiteListSelAllDto, MenuIpWhiteListInsOneDto, MenuIpWhiteListUpdOneDto } from './dto';

@Controller('/main/sys-manage/menu-ip-white-list')
@ApiTags('主系统/系统管理/菜单ip白名单')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class MenuIpWhiteListController {
  constructor(private readonly menuIpWhiteListService: MenuIpWhiteListService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询菜单ip白名单',
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:selList',
    label: '分页查询菜单ip白名单',
  })
  async selMenuIpWhiteList(@Query() dto: MenuIpWhiteListSelListDto): Promise<R> {
    return this.menuIpWhiteListService.selMenuIpWhiteList(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有菜单ip白名单',
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:selAll',
    label: '查询所有菜单ip白名单',
  })
  async selAllMenuIpWhiteList(@Query() dto: MenuIpWhiteListSelAllDto): Promise<R> {
    return this.menuIpWhiteListService.selAllMenuIpWhiteList(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个菜单ip白名单（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:selOnes',
    label: '查询多个菜单ip白名单（根据id）',
  })
  async selOnesMenuIpWhiteList(@Query() ids: number[]): Promise<R> {
    return this.menuIpWhiteListService.selOnesMenuIpWhiteList(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个菜单ip白名单',
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:selOne',
    label: '查询单个菜单ip白名单',
  })
  async selOneMenuIpWhiteList(@Param('id') id: number): Promise<R> {
    return this.menuIpWhiteListService.selOneMenuIpWhiteList(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增菜单ip白名单',
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:ins',
    label: '新增菜单ip白名单',
  })
  async insMenuIpWhiteList(@Body() dto: MenuIpWhiteListInsOneDto): Promise<R> {
    return this.menuIpWhiteListService.insMenuIpWhiteList(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增菜单ip白名单',
  })
  @ApiBody({
    isArray: true,
    type: MenuIpWhiteListInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:inss',
    label: '批量新增菜单ip白名单',
  })
  async insMenuIpWhiteLists(@Body(
    new ParseArrayPipe({
      items: MenuIpWhiteListInsOneDto,
    }),
  ) dtos: MenuIpWhiteListInsOneDto[]): Promise<R> {
    return this.menuIpWhiteListService.insMenuIpWhiteLists(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改菜单ip白名单',
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:upd',
    label: '修改菜单ip白名单',
  })
  async updMenuIpWhiteList(@Body() dto: MenuIpWhiteListUpdOneDto): Promise<R> {
    return this.menuIpWhiteListService.updMenuIpWhiteList(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改菜单ip白名单',
  })
  @ApiBody({
    isArray: true,
    type: MenuIpWhiteListUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:upds',
    label: '批量修改菜单ip白名单',
  })
  async updMenuIpWhiteLists(@Body(
    new ParseArrayPipe({
      items: MenuIpWhiteListUpdOneDto,
    }),
  ) dtos: MenuIpWhiteListUpdOneDto[]): Promise<R> {
    return this.menuIpWhiteListService.updMenuIpWhiteLists(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除菜单ip白名单',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menuIpWhiteList:del',
    label: '删除菜单ip白名单',
  })
  async delMenuIpWhiteList(@Body() ids: number[]): Promise<R> {
    return this.menuIpWhiteListService.delMenuIpWhiteList(ids);
  }
}
