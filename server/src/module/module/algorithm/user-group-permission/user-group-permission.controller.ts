import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserGroupPermissionService } from './user-group-permission.service';
import { Authorize } from '../../../../decorator/authorize.decorator';
import { R } from '../../../../common/R';
import { ValidationPipe } from '../../../../pipe/validation/validation.pipe';
import { UserGroupPermissionDto, UserGroupPermissionSelListDto, UserGroupPermissionSelAllDto, UserGroupPermissionInsOneDto, UserGroupPermissionUpdOneDto } from './dto';

@Controller('/algorithm/user-group-permission')
@ApiTags('算法系统/用户组接口组')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class UserGroupPermissionController {
  constructor(private readonly userGroupPermissionService: UserGroupPermissionService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询用户组接口组',
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:selList',
    label: '分页查询用户组接口组',
  })
  async selUserGroupPermission(@Query() dto: UserGroupPermissionSelListDto): Promise<R> {
    return this.userGroupPermissionService.selUserGroupPermission(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有用户组接口组',
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:selAll',
    label: '查询所有用户组接口组',
  })
  async selAllUserGroupPermission(@Query() dto: UserGroupPermissionSelAllDto): Promise<R> {
    return this.userGroupPermissionService.selAllUserGroupPermission(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个用户组接口组（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:selOnes',
    label: '查询多个用户组接口组（根据id）',
  })
  async selOnesUserGroupPermission(@Query() ids: number[]): Promise<R> {
    return this.userGroupPermissionService.selOnesUserGroupPermission(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个用户组接口组',
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:selOne',
    label: '查询单个用户组接口组',
  })
  async selOneUserGroupPermission(@Param('id') id: number): Promise<R> {
    return this.userGroupPermissionService.selOneUserGroupPermission(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增用户组接口组',
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:ins',
    label: '新增用户组接口组',
  })
  async insUserGroupPermission(@Body() dto: UserGroupPermissionInsOneDto): Promise<R> {
    return this.userGroupPermissionService.insUserGroupPermission(dto);
  }

  @Delete()
  @ApiOperation({
    summary: '删除用户组接口组',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:userGroupPermission:del',
    label: '删除用户组接口组',
  })
  async delUserGroupPermission(@Body() ids: number[]): Promise<R> {
    return this.userGroupPermissionService.delUserGroupPermission(ids);
  }
}
