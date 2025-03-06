import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { currentEnv } from '../../../../../../config/config';

@Injectable()
export class SmsService {
  private env: ReturnType<typeof currentEnv>;

  constructor(private readonly prisma: PrismaService) {
    this.env = currentEnv();
  }
}
