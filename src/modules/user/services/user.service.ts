import { Injectable } from '@nestjs/common';
import UserRepositoryService from './user-repository.service';
import User from '../../database/entities/user.entity';

@Injectable()
export default class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  getUserWithCreds(email: string): Promise<Partial<User>> {
    return this.userRepositoryService.getUserWithLoginCredits(email);
  }

  getUser(options: object): Promise<User> {
    return this.userRepositoryService.findOne(options);
  }
}
