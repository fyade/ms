import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleSysService } from './role-sys.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { RoleSysSelListDto, RoleSysSelAllDto, RoleSysInsOneDto, RoleSysUpdOneDto } from './dto';

@Controller('/main/sys-manage/role-sys')
@ApiTags('主系统/系统管理/角色系统')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class RoleSysController {
  constructor(private readonly roleSysService: RoleSysService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询角色系统',
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:selList',
    label: '分页查询角色系统',
  })
  async selRoleSys(@Query() dto: RoleSysSelListDto): Promise<R> {
    return this.roleSysService.selRoleSys(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有角色系统',
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:selAll',
    label: '查询所有角色系统',
  })
  async selAllRoleSys(@Query() dto: RoleSysSelAllDto): Promise<R> {
    return this.roleSysService.selAllRoleSys(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个角色系统（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:selOnes',
    label: '查询多个角色系统（根据id）',
  })
  async selOnesRoleSys(@Query() ids: number[]): Promise<R> {
    return this.roleSysService.selOnesRoleSys(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个角色系统',
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:selOne',
    label: '查询单个角色系统',
  })
  async selOneRoleSys(@Param('id') id: number): Promise<R> {
    return this.roleSysService.selOneRoleSys(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增角色系统',
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:ins',
    label: '新增角色系统',
  })
  async insRoleSys(@Body() dto: RoleSysInsOneDto): Promise<R> {
    return this.roleSysService.insRoleSys(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增角色系统',
  })
  @ApiBody({
    isArray: true,
    type: RoleSysInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:inss',
    label: '批量新增角色系统',
  })
  async insRoleSyss(@Body(
    new ParseArrayPipe({
      items: RoleSysInsOneDto,
    }),
  ) dtos: RoleSysInsOneDto[]): Promise<R> {
    return this.roleSysService.insRoleSyss(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改角色系统',
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:upd',
    label: '修改角色系统',
  })
  async updRoleSys(@Body() dto: RoleSysUpdOneDto): Promise<R> {
    return this.roleSysService.updRoleSys(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改角色系统',
  })
  @ApiBody({
    isArray: true,
    type: RoleSysUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:upds',
    label: '批量修改角色系统',
  })
  async updRoleSyss(@Body(
    new ParseArrayPipe({
      items: RoleSysUpdOneDto,
    }),
  ) dtos: RoleSysUpdOneDto[]): Promise<R> {
    return this.roleSysService.updRoleSyss(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除角色系统',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:roleSys:del',
    label: '删除角色系统',
  })
  async delRoleSys(@Body() ids: number[]): Promise<R> {
    return this.roleSysService.delRoleSys(ids);
  }
}
