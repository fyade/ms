import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { R } from "../../../../../common/R";

@Controller('/main/sys/sms')
@ApiTags('通用/腾讯云sms')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
}
