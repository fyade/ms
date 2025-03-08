import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { StaticGuard } from '../../guard/staticGuard';
import { Response } from 'express';
import { serverConfig } from "@ms/config";

@Controller(serverConfig.currentConfig().staticRoot)
@UseGuards(StaticGuard)
export class StaticController {
  @Get('{/*filename}')
  static(@Param('filename') filename: string[], @Res() res: Response) {
    const filepath = serverConfig.currentConfig().file.uploadPath + '/' + filename.join('/');
    res.sendFile(filepath);
  }
}
