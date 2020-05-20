import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import userProviders from './providers/users.providers';
import UserService from './services/user.service';
import UserRepositoryService from './services/user-repository.service';
import UserController from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserRepositoryService,
    UserService,
  ],
  exports: [UserService],
})

export default class UserModule {}
