import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeptService } from './dept.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { DeptSelListDto, DeptSelAllDto, DeptInsOneDto, DeptUpdOneDto } from './dto';

@Controller('/main/sys-manage/dept')
@ApiTags('主系统/系统管理/部门')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class DeptController {
  constructor(private readonly deptService: DeptService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询部门',
  })
  @Authorize({
    permission: 'main:sysManage:dept:selList',
    label: '分页查询部门',
  })
  async selDept(@Query() dto: DeptSelListDto): Promise<R> {
    return this.deptService.selDept(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有部门',
  })
  @Authorize({
    permission: 'main:sysManage:dept:selAll',
    label: '查询所有部门',
  })
  async selAllDept(@Query() dto: DeptSelAllDto): Promise<R> {
    return this.deptService.selAllDept(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个部门（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dept:selOnes',
    label: '查询多个部门（根据id）',
  })
  async selOnesDept(@Query() ids: number[]): Promise<R> {
    return this.deptService.selOnesDept(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个部门',
  })
  @Authorize({
    permission: 'main:sysManage:dept:selOne',
    label: '查询单个部门',
  })
  async selOneDept(@Param('id') id: number): Promise<R> {
    return this.deptService.selOneDept(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增部门',
  })
  @Authorize({
    permission: 'main:sysManage:dept:ins',
    label: '新增部门',
  })
  async insDept(@Body() dto: DeptInsOneDto): Promise<R> {
    return this.deptService.insDept(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增部门',
  })
  @ApiBody({
    isArray: true,
    type: DeptInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dept:inss',
    label: '批量新增部门',
  })
  async insDepts(@Body(
    new ParseArrayPipe({
      items: DeptInsOneDto,
    }),
  ) dtos: DeptInsOneDto[]): Promise<R> {
    return this.deptService.insDepts(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改部门',
  })
  @Authorize({
    permission: 'main:sysManage:dept:upd',
    label: '修改部门',
  })
  async updDept(@Body() dto: DeptUpdOneDto): Promise<R> {
    return this.deptService.updDept(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改部门',
  })
  @ApiBody({
    isArray: true,
    type: DeptUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:dept:upds',
    label: '批量修改部门',
  })
  async updDepts(@Body(
    new ParseArrayPipe({
      items: DeptUpdOneDto,
    }),
  ) dtos: DeptUpdOneDto[]): Promise<R> {
    return this.deptService.updDepts(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除部门',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:dept:del',
    label: '删除部门',
  })
  async delDept(@Body() ids: number[]): Promise<R> {
    return this.deptService.delDept(ids);
  }
}
