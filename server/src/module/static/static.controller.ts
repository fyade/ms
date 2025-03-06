import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { currentEnv } from '../../../config/config';
import { StaticGuard } from '../../guard/staticGuard';
import { Response } from 'express';

@Controller(currentEnv().staticRoot)
@UseGuards(StaticGuard)
export class StaticController {
  @Get('/*')
  static(@Param('filename') filename: string, @Res() res: Response) {
    const filepath = currentEnv().file.uploadPath + filename;
    res.sendFile(filepath);
  }
}
