import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InterfaceService } from './interface.service';
import { Authorize } from '../../../../decorator/authorizeDecorator';
import { R } from '../../../../common/R';
import { ValidationPipe } from '../../../../pipe/validation/validation.pipe';
import { InterfaceSelListDto, InterfaceSelAllDto, InterfaceInsOneDto, InterfaceUpdOneDto } from './dto';

@Controller('/algorithm/interface')
@ApiTags('算法系统/接口')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class InterfaceController {
  constructor(private readonly interfaceService: InterfaceService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询接口',
  })
  @Authorize({
    permission: 'algorithm:interface:selList',
    label: '分页查询接口',
  })
  async selInterface(@Query() dto: InterfaceSelListDto): Promise<R> {
    return this.interfaceService.selInterface(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有接口',
  })
  @Authorize({
    permission: 'algorithm:interface:selAll',
    label: '查询所有接口',
  })
  async selAllInterface(@Query() dto: InterfaceSelAllDto): Promise<R> {
    return this.interfaceService.selAllInterface(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个接口（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:interface:selOnes',
    label: '查询多个接口（根据id）',
  })
  async selOnesInterface(@Query() ids: number[]): Promise<R> {
    return this.interfaceService.selOnesInterface(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个接口',
  })
  @Authorize({
    permission: 'algorithm:interface:selOne',
    label: '查询单个接口',
  })
  async selOneInterface(@Param('id') id: number): Promise<R> {
    return this.interfaceService.selOneInterface(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增接口',
  })
  @Authorize({
    permission: 'algorithm:interface:ins',
    label: '新增接口',
  })
  async insInterface(@Body() dto: InterfaceInsOneDto): Promise<R> {
    return this.interfaceService.insInterface(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增接口',
  })
  @ApiBody({
    isArray: true,
    type: InterfaceInsOneDto,
  })
  @Authorize({
    permission: 'algorithm:interface:inss',
    label: '批量新增接口',
  })
  async insInterfaces(@Body(
    new ParseArrayPipe({
      items: InterfaceInsOneDto,
    }),
  ) dtos: InterfaceInsOneDto[]): Promise<R> {
    return this.interfaceService.insInterfaces(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改接口',
  })
  @Authorize({
    permission: 'algorithm:interface:upd',
    label: '修改接口',
  })
  async updInterface(@Body() dto: InterfaceUpdOneDto): Promise<R> {
    return this.interfaceService.updInterface(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改接口',
  })
  @ApiBody({
    isArray: true,
    type: InterfaceUpdOneDto,
  })
  @Authorize({
    permission: 'algorithm:interface:upds',
    label: '批量修改接口',
  })
  async updInterfaces(@Body(
    new ParseArrayPipe({
      items: InterfaceUpdOneDto,
    }),
  ) dtos: InterfaceUpdOneDto[]): Promise<R> {
    return this.interfaceService.updInterfaces(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除接口',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:interface:del',
    label: '删除接口',
  })
  async delInterface(@Body() ids: number[]): Promise<R> {
    return this.interfaceService.delInterface(ids);
  }
}
