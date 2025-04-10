import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CodeGenTableService } from './code-gen-table.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { CodeGenTableSelListDto, CodeGenTableSelAllDto, CodeGenTableInsOneDto, CodeGenTableUpdOneDto, CodeGenTableInsMoreDto, CodeGenTableUpdMoreDto } from './dto';

@Controller('/main/sys-util/code-gen-table')
@ApiTags('主系统/系统工具/代码生成-表信息')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class CodeGenTableController {
  constructor(private readonly codeGenTableService: CodeGenTableService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询代码生成-表信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:selList',
    label: '分页查询代码生成-表信息',
  })
  async selCodeGenTable(@Query() dto: CodeGenTableSelListDto): Promise<R> {
    return this.codeGenTableService.selCodeGenTable(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有代码生成-表信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:selAll',
    label: '查询所有代码生成-表信息',
  })
  async selAllCodeGenTable(@Query() dto: CodeGenTableSelAllDto): Promise<R> {
    return this.codeGenTableService.selAllCodeGenTable(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个代码生成-表信息（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:selOnes',
    label: '查询多个代码生成-表信息（根据id）',
  })
  async selOnesCodeGenTable(@Query() ids: number[]): Promise<R> {
    return this.codeGenTableService.selOnesCodeGenTable(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个代码生成-表信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:selOne',
    label: '查询单个代码生成-表信息',
  })
  async selOneCodeGenTable(@Param('id') id: number): Promise<R> {
    return this.codeGenTableService.selOneCodeGenTable(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增代码生成-表信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:ins',
    label: '新增代码生成-表信息',
  })
  async insCodeGenTable(@Body() dto: CodeGenTableInsOneDto): Promise<R> {
    return this.codeGenTableService.insCodeGenTable(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增代码生成-表信息',
  })
  @ApiBody({
    isArray: true,
    type: CodeGenTableInsOneDto,
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:inss',
    label: '批量新增代码生成-表信息',
  })
  async insCodeGenTables(@Body() dto: CodeGenTableInsMoreDto): Promise<R> {
    return this.codeGenTableService.insCodeGenTables(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改代码生成-表信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:upd',
    label: '修改代码生成-表信息',
  })
  async updCodeGenTable(@Body() dto: CodeGenTableUpdOneDto): Promise<R> {
    return this.codeGenTableService.updCodeGenTable(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改代码生成-表信息',
  })
  @ApiBody({
    isArray: true,
    type: CodeGenTableUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:upds',
    label: '批量修改代码生成-表信息',
  })
  async updCodeGenTables(@Body() dto: CodeGenTableUpdMoreDto): Promise<R> {
    return this.codeGenTableService.updCodeGenTables(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除代码生成-表信息',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysUtil:codeGenTable:del',
    label: '删除代码生成-表信息',
  })
  async delCodeGenTable(@Body() ids: number[]): Promise<R> {
    return this.codeGenTableService.delCodeGenTable(ids);
  }
}
