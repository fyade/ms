import { Controller, UsePipes } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';

@Controller('/main/sys/sms')
@ApiTags('通用/腾讯云sms')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class SmsController {
  constructor(private readonly smsService: SmsService) {
  }
}
