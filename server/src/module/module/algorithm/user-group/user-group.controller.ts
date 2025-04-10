import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserGroupService } from './user-group.service';
import { Authorize } from '../../../../decorator/authorize.decorator';
import { R } from '../../../../common/R';
import { UserGroupSelListDto, UserGroupSelAllDto, UserGroupInsOneDto, UserGroupUpdOneDto, UserGroupInsMoreDto, UserGroupUpdMoreDto } from './dto';

@Controller('/algorithm/user-group')
@ApiTags('算法系统/用户组')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询用户组',
  })
  @Authorize({
    permission: 'algorithm:userGroup:selList',
    label: '分页查询用户组',
  })
  async selUserGroup(@Query() dto: UserGroupSelListDto): Promise<R> {
    return this.userGroupService.selUserGroup(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有用户组',
  })
  @Authorize({
    permission: 'algorithm:userGroup:selAll',
    label: '查询所有用户组',
  })
  async selAllUserGroup(@Query() dto: UserGroupSelAllDto): Promise<R> {
    return this.userGroupService.selAllUserGroup(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个用户组（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:userGroup:selOnes',
    label: '查询多个用户组（根据id）',
  })
  async selOnesUserGroup(@Query() ids: number[]): Promise<R> {
    return this.userGroupService.selOnesUserGroup(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个用户组',
  })
  @Authorize({
    permission: 'algorithm:userGroup:selOne',
    label: '查询单个用户组',
  })
  async selOneUserGroup(@Param('id') id: number): Promise<R> {
    return this.userGroupService.selOneUserGroup(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增用户组',
  })
  @Authorize({
    permission: 'algorithm:userGroup:ins',
    label: '新增用户组',
  })
  async insUserGroup(@Body() dto: UserGroupInsOneDto): Promise<R> {
    return this.userGroupService.insUserGroup(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增用户组',
  })
  @ApiBody({
    isArray: true,
    type: UserGroupInsOneDto,
  })
  @Authorize({
    permission: 'algorithm:userGroup:inss',
    label: '批量新增用户组',
  })
  async insUserGroups(@Body() dto: UserGroupInsMoreDto): Promise<R> {
    return this.userGroupService.insUserGroups(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改用户组',
  })
  @Authorize({
    permission: 'algorithm:userGroup:upd',
    label: '修改用户组',
  })
  async updUserGroup(@Body() dto: UserGroupUpdOneDto): Promise<R> {
    return this.userGroupService.updUserGroup(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改用户组',
  })
  @ApiBody({
    isArray: true,
    type: UserGroupUpdOneDto,
  })
  @Authorize({
    permission: 'algorithm:userGroup:upds',
    label: '批量修改用户组',
  })
  async updUserGroups(@Body() dto: UserGroupUpdMoreDto): Promise<R> {
    return this.userGroupService.updUserGroups(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除用户组',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:userGroup:del',
    label: '删除用户组',
  })
  async delUserGroup(@Body() ids: number[]): Promise<R> {
    return this.userGroupService.delUserGroup(ids);
  }
}
