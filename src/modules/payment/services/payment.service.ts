import { Injectable } from '@nestjs/common';
import PaymentRepositoryService from './payment-repository.service';
import NewPaymentMethodDto from '../dto/newPaymentMethod.dto';
import InvalidDueDateException from '../exceptions/invaid-due-date.exception';
import PaymentMethodDto from '../dto/paymentMethod.dto';

export enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  UNKNOWN = 'unknown',
}

@Injectable()
export default class PaymentService {
  constructor(
    private readonly paymentRepositoryService: PaymentRepositoryService,
  ) {}

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

  formatPaymentData(paymentData: NewPaymentMethodDto): { cardType: string; maskedCardNumber: string } {
    const { cardNumber, dueDate } = paymentData;
    PaymentService.validateCardDueDate(dueDate);
    const cardType = PaymentService.getCardTypeByNumber(cardNumber);
    const maskedCardNumber = PaymentService.getMaskedCardNumber(cardNumber);
    return { cardType, maskedCardNumber };
  }

  addPaymentMethod(paymentData: NewPaymentMethodDto, userId: number): Promise<PaymentMethodDto> {
    const { cardType, maskedCardNumber } = this.formatPaymentData(paymentData);
    return this.paymentRepositoryService.create(userId, maskedCardNumber, cardType);
  }

  deletePaymentMethod(id: number): Promise<object> {
    return this.paymentRepositoryService.deletePaymentMethod(id);
  }

  getPaymentMethod(id: number, userId: number): Promise<PaymentMethodDto> {
    return this.paymentRepositoryService.getOne(id, userId);
  }
}
