import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { RolePermissionService } from './role-permission.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { RolePermissionDto, RolePermissionSelListDto, RolePermissionSelAllDto, RolePermissionInsOneDto, RolePermissionUpdOneDto, RolePermissionUpdManyDto } from './dto';

@Controller('/main/sys-manage/role-permission')
@ApiTags('主系统/系统管理/角色权限')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
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
