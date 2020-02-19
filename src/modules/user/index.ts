import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import userProviders from './providers/users.providers';
import UserService from './services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [UserService],
})

export default class UserModule {}
