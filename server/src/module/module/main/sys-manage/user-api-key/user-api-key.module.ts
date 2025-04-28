import { Module } from '@nestjs/common';
import { UserApiKeyController } from './user-api-key.controller';
import { UserApiKeyService } from './user-api-key.service';

@Module({
  controllers: [UserApiKeyController],
  providers: [UserApiKeyService]
})
export class UserApiKeyModule {}
