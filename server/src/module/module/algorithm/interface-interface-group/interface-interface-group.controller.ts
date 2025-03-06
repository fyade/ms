import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InterfaceInterfaceGroupService } from './interface-interface-group.service';
import { Authorize } from '../../../../decorator/authorizeDecorator';
import { R } from '../../../../common/R';
import { ValidationPipe } from '../../../../pipe/validation/validation.pipe';
import { InterfaceInterfaceGroupDto, InterfaceInterfaceGroupSelListDto, InterfaceInterfaceGroupSelAllDto, InterfaceInterfaceGroupInsOneDto, InterfaceInterfaceGroupUpdOneDto, InterfaceInterfaceGroupUpdIIGDto, InterfaceInterfaceGroupUpdIGIDto } from './dto';

@Controller('/algorithm/interface-interface-group')
@ApiTags('算法系统/接口接口组')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class InterfaceInterfaceGroupController {
  constructor(private readonly interfaceInterfaceGroupService: InterfaceInterfaceGroupService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询接口接口组',
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:selList',
    label: '分页查询接口接口组',
  })
  async selInterfaceInterfaceGroup(@Query() dto: InterfaceInterfaceGroupSelListDto): Promise<R> {
    return this.interfaceInterfaceGroupService.selInterfaceInterfaceGroup(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有接口接口组',
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:selAll',
    label: '查询所有接口接口组',
  })
  async selAllInterfaceInterfaceGroup(@Query() dto: InterfaceInterfaceGroupSelAllDto): Promise<R> {
    return this.interfaceInterfaceGroupService.selAllInterfaceInterfaceGroup(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个接口接口组（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:selOnes',
    label: '查询多个接口接口组（根据id）',
  })
  async selOnesInterfaceInterfaceGroup(@Query() ids: number[]): Promise<R> {
    return this.interfaceInterfaceGroupService.selOnesInterfaceInterfaceGroup(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个接口接口组',
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:selOne',
    label: '查询单个接口接口组',
  })
  async selOneInterfaceInterfaceGroup(@Param('id') id: number): Promise<R> {
    return this.interfaceInterfaceGroupService.selOneInterfaceInterfaceGroup(id);
  }

  @Post('/iig')
  @ApiOperation({
    summary: '更新接口接口组（iig）',
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:updIig',
    label: '更新接口接口组（iig）',
  })
  async updInterfaceInterfaceGroupIIG(@Body() dto: InterfaceInterfaceGroupUpdIIGDto): Promise<R> {
    return this.interfaceInterfaceGroupService.updInterfaceInterfaceGroupIIG(dto);
  }

  @Post('/igi')
  @ApiOperation({
    summary: '更新接口接口组（igi）',
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:updIgi',
    label: '更新接口接口组（igi）',
  })
  async updInterfaceInterfaceGroupIGI(@Body() dto: InterfaceInterfaceGroupUpdIGIDto): Promise<R> {
    return this.interfaceInterfaceGroupService.updInterfaceInterfaceGroupIGI(dto);
  }

  @Delete()
  @ApiOperation({
    summary: '删除接口接口组',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:interfaceInterfaceGroup:del',
    label: '删除接口接口组',
  })
  async delInterfaceInterfaceGroup(@Body() ids: number[]): Promise<R> {
    return this.interfaceInterfaceGroupService.delInterfaceInterfaceGroup(ids);
  }
}
