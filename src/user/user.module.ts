import { Module } from '@nestjs/common';
import { userResolver } from './user.resolver';
import { userService } from './user.service';

@Module({
  providers: [userService, userResolver],
})
export class UserModule {}
