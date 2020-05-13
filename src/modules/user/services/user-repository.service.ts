import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { USER_REPOSITORY } from '../../../constants';
import User from '../../database/entities/user/user.entity';

@Injectable()
export default class UserRepositoryService extends BaseRepositoryService<User> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  getUserWithLoginCredits(email: string): Promise<Partial<User>> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  create(email, password): Promise<User> {
    const user = new User();
    user.password = password;
    user.email = email;
    return this.userRepository.save(user);
  }

  getUserByEmail(email): Promise<User> {
    return this.findOne({ email });
  }

  getDetails(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      select: ['id', 'name', 'email'],
      relations: ['paymentMethods'],
    });
  }
}
