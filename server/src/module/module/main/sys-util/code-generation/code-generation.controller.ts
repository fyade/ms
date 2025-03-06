import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { CodeGenerationService } from './code-generation.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';

@Controller('/main/sys-util/code-generation')
@ApiTags('主系统/系统工具/代码生成')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class CodeGenerationController {
  constructor(private readonly codeGenerationService: CodeGenerationService) {
  }

  @Get()
  @ApiOperation({
    summary: '查询数据库信息',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGeneration:get',
    label: '查询数据库信息',
  })
  async getDatabaseInfo(): Promise<R> {
    return this.codeGenerationService.getDatabaseInfo();
  }

  @Get('/c/:id')
  @ApiOperation({
    summary: '获取代码生成代码',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGeneration:getCode',
    label: '获取代码生成代码',
  })
  async genCode(@Param('id') id: number): Promise<R> {
    return this.codeGenerationService.genCode(id);
  }

  @Get('/z/:id')
  @ApiOperation({
    summary: '获取代码生成代码压缩包',
  })
  @Authorize({
    permission: 'main:sysUtil:codeGeneration:getCodeZip',
    label: '获取代码生成代码压缩包',
  })
  async genCodeZip(@Param('id') id: number): Promise<R> {
    return this.codeGenerationService.genCodeZip(id);
  }
}
