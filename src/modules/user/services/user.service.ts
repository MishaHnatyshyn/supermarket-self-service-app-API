import {Injectable} from '@nestjs/common';
import UserRepositoryService from './user-repository.service';
import User from '../../database/entities/user.entity';
import EmailUniquenessException from '../exceptions/email-uniqueness.exception';

@Injectable()
export default class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  private async checkEmailUniqueness(email: string) {
    const user = await this.userRepositoryService.getUserByEmail(email);
    if (user) {
      throw new EmailUniquenessException();
    }
  }

  getUserWithCreds(email: string): Promise<Partial<User>> {
    return this.userRepositoryService.getUserWithLoginCredits(email);
  }

  getUser(options: object): Promise<User> {
    return this.userRepositoryService.findOne(options);
  }

  async createUser(email, password): Promise<User> {
    await this.checkEmailUniqueness(email);
    return this.userRepositoryService.create(email, password);
  }
}
