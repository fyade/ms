import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { RoleSelListDto, RoleSelAllDto, RoleInsOneDto, RoleUpdOneDto } from './dto';

@Controller('/main/sys-manage/role')
@ApiTags('主系统/系统管理/角色')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询角色',
  })
  @Authorize({
    permission: 'main:sysManage:role:selList',
    label: '分页查询角色',
  })
  async selRole(@Query() dto: RoleSelListDto): Promise<R> {
    return this.roleService.selRole(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有角色',
  })
  @Authorize({
    permission: 'main:sysManage:role:selAll',
    label: '查询所有角色',
  })
  async selAllRole(@Query() dto: RoleSelAllDto): Promise<R> {
    return this.roleService.selAllRole(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个角色（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:role:selOnes',
    label: '查询多个角色（根据id）',
  })
  async selOnesRole(@Query() ids: number[]): Promise<R> {
    return this.roleService.selOnesRole(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个角色',
  })
  @Authorize({
    permission: 'main:sysManage:role:selOne',
    label: '查询单个角色',
  })
  async selOneRole(@Param('id') id: number): Promise<R> {
    return this.roleService.selOneRole(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增角色',
  })
  @Authorize({
    permission: 'main:sysManage:role:ins',
    label: '新增角色',
  })
  async insRole(@Body() dto: RoleInsOneDto): Promise<R> {
    return this.roleService.insRole(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增角色',
  })
  @ApiBody({
    isArray: true,
    type: RoleInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:role:inss',
    label: '批量新增角色',
  })
  async insRoles(@Body(
    new ParseArrayPipe({
      items: RoleInsOneDto,
    }),
  ) dtos: RoleInsOneDto[]): Promise<R> {
    return this.roleService.insRoles(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改角色',
  })
  @Authorize({
    permission: 'main:sysManage:role:upd',
    label: '修改角色',
  })
  async updRole(@Body() dto: RoleUpdOneDto): Promise<R> {
    return this.roleService.updRole(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改角色',
  })
  @ApiBody({
    isArray: true,
    type: RoleUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:role:upds',
    label: '批量修改角色',
  })
  async updRoles(@Body(
    new ParseArrayPipe({
      items: RoleUpdOneDto,
    }),
  ) dtos: RoleUpdOneDto[]): Promise<R> {
    return this.roleService.updRoles(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除角色',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:role:del',
    label: '删除角色',
  })
  async delRole(@Body() ids: number[]): Promise<R> {
    return this.roleService.delRole(ids);
  }
}
