import { Controller, UsePipes } from '@nestjs/common';
import { OnlineUserService } from './online-user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';

@Controller('/main/sys-monitor/online-user')
@ApiTags('主系统/系统监控/在线用户')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class OnlineUserController {
  constructor(private readonly onlineUserService: OnlineUserService) {
  }
}
