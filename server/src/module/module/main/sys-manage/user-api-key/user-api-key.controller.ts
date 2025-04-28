import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserApiKeyService } from './user-api-key.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { UserApiKeySelListDto, UserApiKeySelAllDto, UserApiKeyInsOneDto, UserApiKeyUpdOneDto, UserApiKeyInsMoreDto, UserApiKeyUpdMoreDto } from './dto';

@Controller('/main/sys-manage/user-api-key')
@ApiTags('主系统/系统管理/用户apiKey')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class UserApiKeyController {
  constructor(private readonly userApiKeyService: UserApiKeyService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询用户apiKey',
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:selList',
    label: '分页查询用户apiKey',
  })
  async selUserApiKey(@Query() dto: UserApiKeySelListDto): Promise<R> {
    return this.userApiKeyService.selUserApiKey(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有用户apiKey',
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:selAll',
    label: '查询所有用户apiKey',
  })
  async selAllUserApiKey(@Query() dto: UserApiKeySelAllDto): Promise<R> {
    return this.userApiKeyService.selAllUserApiKey(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个用户apiKey（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:selOnes',
    label: '查询多个用户apiKey（根据id）',
  })
  async selOnesUserApiKey(@Query() ids: number[]): Promise<R> {
    return this.userApiKeyService.selOnesUserApiKey(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个用户apiKey',
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:selOne',
    label: '查询单个用户apiKey',
  })
  async selOneUserApiKey(@Param('id') id: number): Promise<R> {
    return this.userApiKeyService.selOneUserApiKey(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增用户apiKey',
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:ins',
    label: '新增用户apiKey',
  })
  async insUserApiKey(@Body() dto: UserApiKeyInsOneDto): Promise<R> {
    return this.userApiKeyService.insUserApiKey(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增用户apiKey',
  })
  @ApiBody({
    isArray: true,
    type: UserApiKeyInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:inss',
    label: '批量新增用户apiKey',
  })
  async insUserApiKeys(@Body() dto: UserApiKeyInsMoreDto): Promise<R> {
    return this.userApiKeyService.insUserApiKeys(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改用户apiKey',
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:upd',
    label: '修改用户apiKey',
  })
  async updUserApiKey(@Body() dto: UserApiKeyUpdOneDto): Promise<R> {
    return this.userApiKeyService.updUserApiKey(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改用户apiKey',
  })
  @ApiBody({
    isArray: true,
    type: UserApiKeyUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:upds',
    label: '批量修改用户apiKey',
  })
  async updUserApiKeys(@Body() dto: UserApiKeyUpdMoreDto): Promise<R> {
    return this.userApiKeyService.updUserApiKeys(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除用户apiKey',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:userApiKey:del',
    label: '删除用户apiKey',
  })
  async delUserApiKey(@Body() ids: number[]): Promise<R> {
    return this.userApiKeyService.delUserApiKey(ids);
  }
}
