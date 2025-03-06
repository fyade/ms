import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserTableDefaultPermissionService } from './user-table-default-permission.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { UserTableDefaultPermissionSelListDto, UserTableDefaultPermissionSelAllDto, UserTableDefaultPermissionInsOneDto, UserTableDefaultPermissionUpdOneDto } from './dto';

@Controller('/main/other-user/user-table-default-permission')
@ApiTags('主系统/非系统用户管理/用户表默认权限')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class UserTableDefaultPermissionController {
  constructor(private readonly userTableDefaultPermissionService: UserTableDefaultPermissionService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询用户表默认权限',
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:selList',
    label: '分页查询用户表默认权限',
  })
  async selUserTableDefaultPermission(@Query() dto: UserTableDefaultPermissionSelListDto): Promise<R> {
    return this.userTableDefaultPermissionService.selUserTableDefaultPermission(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有用户表默认权限',
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:selAll',
    label: '查询所有用户表默认权限',
  })
  async selAllUserTableDefaultPermission(@Query() dto: UserTableDefaultPermissionSelAllDto): Promise<R> {
    return this.userTableDefaultPermissionService.selAllUserTableDefaultPermission(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个用户表默认权限（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:selOnes',
    label: '查询多个用户表默认权限（根据id）',
  })
  async selOnesUserTableDefaultPermission(@Query() ids: number[]): Promise<R> {
    return this.userTableDefaultPermissionService.selOnesUserTableDefaultPermission(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个用户表默认权限',
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:selOne',
    label: '查询单个用户表默认权限',
  })
  async selOneUserTableDefaultPermission(@Param('id') id: number): Promise<R> {
    return this.userTableDefaultPermissionService.selOneUserTableDefaultPermission(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增用户表默认权限',
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:ins',
    label: '新增用户表默认权限',
  })
  async insUserTableDefaultPermission(@Body() dto: UserTableDefaultPermissionInsOneDto): Promise<R> {
    return this.userTableDefaultPermissionService.insUserTableDefaultPermission(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增用户表默认权限',
  })
  @ApiBody({
    isArray: true,
    type: UserTableDefaultPermissionInsOneDto,
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:inss',
    label: '批量新增用户表默认权限',
  })
  async insUserTableDefaultPermissions(@Body(
    new ParseArrayPipe({
      items: UserTableDefaultPermissionInsOneDto,
    }),
  ) dtos: UserTableDefaultPermissionInsOneDto[]): Promise<R> {
    return this.userTableDefaultPermissionService.insUserTableDefaultPermissions(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改用户表默认权限',
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:upd',
    label: '修改用户表默认权限',
  })
  async updUserTableDefaultPermission(@Body() dto: UserTableDefaultPermissionUpdOneDto): Promise<R> {
    return this.userTableDefaultPermissionService.updUserTableDefaultPermission(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改用户表默认权限',
  })
  @ApiBody({
    isArray: true,
    type: UserTableDefaultPermissionUpdOneDto,
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:upds',
    label: '批量修改用户表默认权限',
  })
  async updUserTableDefaultPermissions(@Body(
    new ParseArrayPipe({
      items: UserTableDefaultPermissionUpdOneDto,
    }),
  ) dtos: UserTableDefaultPermissionUpdOneDto[]): Promise<R> {
    return this.userTableDefaultPermissionService.updUserTableDefaultPermissions(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除用户表默认权限',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:otherUser:userTableDefaultPermission:del',
    label: '删除用户表默认权限',
  })
  async delUserTableDefaultPermission(@Body() ids: number[]): Promise<R> {
    return this.userTableDefaultPermissionService.delUserTableDefaultPermission(ids);
  }
}
