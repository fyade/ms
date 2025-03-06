import { Module } from '@nestjs/common';
import { UserVisitorController } from './user-visitor.controller';
import { UserVisitorService } from './user-visitor.service';

@Module({
  controllers: [UserVisitorController],
  providers: [UserVisitorService]
})
export class UserVisitorModule {}
