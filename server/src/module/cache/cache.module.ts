import { Global, Module } from '@nestjs/common';
import { CachePermissionService } from './cache.permission.service';
import { CacheTokenService } from './cache.token.service';

@Global()
@Module({
  providers: [
    CachePermissionService,
    CacheTokenService
  ],
  exports: [
    CachePermissionService,
    CacheTokenService
  ],
})
export class CacheModule {}
