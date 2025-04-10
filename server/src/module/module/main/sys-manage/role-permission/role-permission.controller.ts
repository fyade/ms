import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolePermissionService } from './role-permission.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { RolePermissionSelListDto, RolePermissionSelAllDto, RolePermissionUpdManyDto } from './dto';

@Controller('/main/sys-manage/role-permission')
@ApiTags('主系统/系统管理/角色权限')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询角色权限',
  })
  @Authorize({
    permission: 'main:sysManage:rolePermission:selList',
    label: '分页查询角色权限',
  })
  async selRolePermission(@Query() dto: RolePermissionSelListDto): Promise<R> {
    return this.rolePermissionService.selRolePermission(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有角色权限',
  })
  @Authorize({
    permission: 'main:sysManage:rolePermission:selAll',
    label: '查询所有角色权限',
  })
  async selAllRolePermission(@Query() dto: RolePermissionSelAllDto): Promise<R> {
    return this.rolePermissionService.selAllRolePermission(dto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个角色权限',
  })
  @Authorize({
    permission: 'main:sysManage:rolePermission:selOne',
    label: '查询单个角色权限',
  })
  async selOneRolePermission(@Param('id') id: number): Promise<R> {
    return this.rolePermissionService.selOneRolePermission(id);
  }

  @Post('/rp')
  @ApiOperation({
    summary: '修改角色权限',
  })
  @Authorize({
    permission: 'main:sysManage:rolePermission:upd',
    label: '修改角色权限',
  })
  async updRolePermissionRp(@Body() dto: RolePermissionUpdManyDto): Promise<R> {
    return this.rolePermissionService.updRolePermissionRp(dto);
  }

  @Delete()
  @ApiOperation({
    summary: '删除角色权限',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:rolePermission:del',
    label: '删除角色权限',
  })
  async delRolePermission(@Body() ids: number[]): Promise<R> {
    return this.rolePermissionService.delRolePermission(ids);
  }
}
