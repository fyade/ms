import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeptPermissionService } from './dept-permission.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { DeptPermissionDto, DeptPermissionSelListDto, DeptPermissionSelAllDto, DeptPermissionInsOneDto, DeptPermissionUpdOneDto, DeptPermissionUpdManyDPDto } from './dto';

@Controller('/main/sys-manage/dept-permission')
@ApiTags('主系统/系统管理/部门权限')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class DeptPermissionController {
  constructor(private readonly deptPermissionService: DeptPermissionService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询部门权限',
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:selList',
    label: '分页查询部门权限',
  })
  async selDeptPermission(@Query() dto: DeptPermissionSelListDto): Promise<R> {
    return this.deptPermissionService.selDeptPermission(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有部门权限',
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:selAll',
    label: '查询所有部门权限',
  })
  async selAllDeptPermission(@Query() dto: DeptPermissionSelAllDto): Promise<R> {
    return this.deptPermissionService.selAllDeptPermission(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个部门权限（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:selOnes',
    label: '查询多个部门权限（根据id）',
  })
  async selOnesDeptPermission(@Query() ids: number[]): Promise<R> {
    return this.deptPermissionService.selOnesDeptPermission(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个部门权限',
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:selOne',
    label: '查询单个部门权限',
  })
  async selOneDeptPermission(@Param('id') id: number): Promise<R> {
    return this.deptPermissionService.selOneDeptPermission(id);
  }

  @Post('/dp')
  @ApiOperation({
    summary: '更新部门权限（dp）',
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:upddp',
    label: '更新部门权限（dp）',
  })
  async updDeptPermissionDp(@Body() dto: DeptPermissionUpdManyDPDto): Promise<R> {
    return this.deptPermissionService.updDeptPermissionDp(dto);
  }

  @Delete()
  @ApiOperation({
    summary: '删除部门权限',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:deptPermission:del',
    label: '删除部门权限',
  })
  async delDeptPermission(@Body() ids: number[]): Promise<R> {
    return this.deptPermissionService.delDeptPermission(ids);
  }
}
