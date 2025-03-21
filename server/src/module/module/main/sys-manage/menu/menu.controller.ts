import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { MenuSelListDto, MenuSelAllDto, MenuInsOneDto, MenuUpdOneDto } from './dto';

@Controller('/main/sys-manage/menu')
@ApiTags('主系统/系统管理/菜单')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询菜单',
  })
  @Authorize({
    permission: 'main:sysManage:menu:selList',
    label: '分页查询菜单',
  })
  async selMenu(@Query() dto: MenuSelListDto): Promise<R> {
    return this.menuService.selMenu(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有菜单',
  })
  @Authorize({
    permission: 'main:sysManage:menu:selAll',
    label: '查询所有菜单',
  })
  async selAllMenu(@Query() dto: MenuSelAllDto): Promise<R> {
    return this.menuService.selAllMenu(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个菜单（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menu:selOnes',
    label: '查询多个菜单（根据id）',
  })
  async selOnesMenu(@Query() ids: number[]): Promise<R> {
    return this.menuService.selOnesMenu(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个菜单',
  })
  @Authorize({
    permission: 'main:sysManage:menu:selOne',
    label: '查询单个菜单',
  })
  async selOneMenu(@Param('id') id: number): Promise<R> {
    return this.menuService.selOneMenu(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增菜单',
  })
  @Authorize({
    permission: 'main:sysManage:menu:ins',
    label: '新增菜单',
  })
  async insMenu(@Body() dto: MenuInsOneDto): Promise<R> {
    return this.menuService.insMenu(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增菜单',
  })
  @ApiBody({
    isArray: true,
    type: MenuInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menu:inss',
    label: '批量新增菜单',
  })
  async insMenus(@Body(
    new ParseArrayPipe({
      items: MenuInsOneDto,
    }),
  ) dtos: MenuInsOneDto[]): Promise<R> {
    return this.menuService.insMenus(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改菜单',
  })
  @Authorize({
    permission: 'main:sysManage:menu:upd',
    label: '修改菜单',
  })
  async updMenu(@Body() dto: MenuUpdOneDto): Promise<R> {
    return this.menuService.updMenu(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改菜单',
  })
  @ApiBody({
    isArray: true,
    type: MenuUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menu:upds',
    label: '批量修改菜单',
  })
  async updMenus(@Body(
    new ParseArrayPipe({
      items: MenuUpdOneDto,
    }),
  ) dtos: MenuUpdOneDto[]): Promise<R> {
    return this.menuService.updMenus(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除菜单',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menu:del',
    label: '删除菜单',
  })
  async delMenu(@Body() ids: number[]): Promise<R> {
    return this.menuService.delMenu(ids);
  }
}
