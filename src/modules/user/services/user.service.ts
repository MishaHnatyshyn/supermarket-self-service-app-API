import { Injectable } from '@nestjs/common';
import UserRepositoryService from './user-repository.service';
import User from '../../database/entities/user/user.entity';
import EmailUniquenessException from '../exceptions/email-uniqueness.exception';
import UserDto from '../dto/user.dto';
import UserNotFoundException from '../exceptions/user-not-found.exception';
import PaymentMethod from '../../database/entities/payment/paymentMethod.entity';
import PaymentMethodDto from '../../payment/dto/paymentMethod.dto';


@Injectable()
export default class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  private async checkEmailUniqueness(email: string): Promise<void> {
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

  private static staticFormatPaymentMethodResponse(
    paymentMethods: PaymentMethod[],
  ): PaymentMethodDto[] {
    return paymentMethods.map(({ id, card_number, card_type }) => ({ id, card_number, card_type }));
  }

  async getUserDetails(id: number): Promise<UserDto> {
    const user = await this.userRepositoryService.getDetails(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    const formattedPaymentMethods = UserService.staticFormatPaymentMethodResponse(
      user.paymentMethods,
    );
    return { ...user, paymentMethods: formattedPaymentMethods };
  }
}
