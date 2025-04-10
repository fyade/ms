import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TableRowPermissionService } from './table-row-permission.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { TableRowPermissionSelListDto, TableRowPermissionSelAllDto, TableRowPermissionInsOneDto, TableRowPermissionUpdOneDto, TableRowPermissionInsMoreDto, TableRowPermissionUpdMoreDto } from './dto';

@Controller('/main/sys-manage/table-row-permission')
@ApiTags('主系统/系统管理/数据表行权限')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class TableRowPermissionController {
  constructor(private readonly tableRowPermissionService: TableRowPermissionService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询数据表行权限',
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:selList',
    label: '分页查询数据表行权限',
  })
  async selTableRowPermission(@Query() dto: TableRowPermissionSelListDto): Promise<R> {
    return this.tableRowPermissionService.selTableRowPermission(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有数据表行权限',
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:selAll',
    label: '查询所有数据表行权限',
  })
  async selAllTableRowPermission(@Query() dto: TableRowPermissionSelAllDto): Promise<R> {
    return this.tableRowPermissionService.selAllTableRowPermission(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个数据表行权限（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:selOnes',
    label: '查询多个数据表行权限（根据id）',
  })
  async selOnesTableRowPermission(@Query() ids: number[]): Promise<R> {
    return this.tableRowPermissionService.selOnesTableRowPermission(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个数据表行权限',
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:selOne',
    label: '查询单个数据表行权限',
  })
  async selOneTableRowPermission(@Param('id') id: number): Promise<R> {
    return this.tableRowPermissionService.selOneTableRowPermission(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增数据表行权限',
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:ins',
    label: '新增数据表行权限',
  })
  async insTableRowPermission(@Body() dto: TableRowPermissionInsOneDto): Promise<R> {
    return this.tableRowPermissionService.insTableRowPermission(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增数据表行权限',
  })
  @ApiBody({
    isArray: true,
    type: TableRowPermissionInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:inss',
    label: '批量新增数据表行权限',
  })
  async insTableRowPermissions(@Body() dto: TableRowPermissionInsMoreDto): Promise<R> {
    return this.tableRowPermissionService.insTableRowPermissions(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改数据表行权限',
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:upd',
    label: '修改数据表行权限',
  })
  async updTableRowPermission(@Body() dto: TableRowPermissionUpdOneDto): Promise<R> {
    return this.tableRowPermissionService.updTableRowPermission(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改数据表行权限',
  })
  @ApiBody({
    isArray: true,
    type: TableRowPermissionUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:upds',
    label: '批量修改数据表行权限',
  })
  async updTableRowPermissions(@Body() dto: TableRowPermissionUpdMoreDto): Promise<R> {
    return this.tableRowPermissionService.updTableRowPermissions(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除数据表行权限',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:tableRowPermission:del',
    label: '删除数据表行权限',
  })
  async delTableRowPermission(@Body() ids: number[]): Promise<R> {
    return this.tableRowPermissionService.delTableRowPermission(ids);
  }
}
