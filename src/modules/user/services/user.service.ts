import { HttpException, Injectable } from '@nestjs/common';
import UserRepositoryService from './user-repository.service';
import User from '../../database/entities/user/user.entity';
import EmailUniquenessException from '../exceptions/email-uniqueness.exception';
import UserDto from '../dto/user.dto';
import UserNotFoundException from '../exceptions/user-not-found.exception';
import PaymentRepositoryService from './payment-repository.service';
import NewPaymentMethodDto from '../dto/newPaymentMethod.dto';
import InvalidDueDateException from '../exceptions/invaid-due-date.exception';
import PaymentMethodDto from '../dto/paymentMethod.dto';
import PaymentMethod from '../../database/entities/payment/paymentMethod.entity';

export enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  UNKNOWN = 'unknown',
}

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly paymentRepositoryService: PaymentRepositoryService,
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

  private static validateCardDueDate(date: string): void {
    const [month, year] = date.split('/').map(stringDate => parseInt(stringDate, 10));
    const isMonthValid = !isNaN(month) && month >= 1 && month <= 12;
    const isYearValid = !isNaN(year) && year >= 20 && year <= 99;
    if (!isMonthValid || !isYearValid) {
      throw new InvalidDueDateException();
    }
  }

  private static getCardTypeByNumber(cardNumber: string): CardType {
    if (cardNumber.startsWith('4')) {
      return CardType.VISA;
    }
    const firstTwoCardNumberDigits = parseInt(cardNumber.slice(0, 2), 10);
    if (firstTwoCardNumberDigits >= 51 && firstTwoCardNumberDigits <= 55) {
      return CardType.MASTERCARD;
    }
    return CardType.UNKNOWN;
  }

  private static getMaskedCardNumber(number: string): string {
    const firstFourDigits = number.slice(0, 4);
    const lastFourDigits = number.slice(-4);
    const mask = '*'.repeat(8);
    return `${firstFourDigits}${mask}${lastFourDigits}`;
  }

  addPaymentMethod(paymentData: NewPaymentMethodDto, userId: number): Promise<PaymentMethodDto> {
    const { cardNumber, dueDate } = paymentData;
    UserService.validateCardDueDate(dueDate);
    const cardType = UserService.getCardTypeByNumber(cardNumber);
    const maskedCardNumber = UserService.getMaskedCardNumber(cardNumber);
    return this.paymentRepositoryService.create(userId, maskedCardNumber, cardType);
  }

  deletePaymentMethod(id: number): Promise<object> {
    return this.paymentRepositoryService.delete({ id });
  }
}
