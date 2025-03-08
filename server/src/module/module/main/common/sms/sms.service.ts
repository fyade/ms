import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { serverConfig } from "@ms/config";

@Injectable()
export class SmsService {
  private env: ReturnType<typeof serverConfig.currentConfig>;

  constructor(private readonly prisma: PrismaService) {
    this.env = serverConfig.currentConfig();
  }
}
