import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { PAYMENT_METHOD_REPOSITORY } from '../../../constants';
import PaymentMethod from '../../database/entities/payment/paymentMethod.entity';

@Injectable()
export default class PaymentRepositoryService extends BaseRepositoryService<PaymentMethod> {
  constructor(
    @Inject(PAYMENT_METHOD_REPOSITORY)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {
    super(paymentMethodRepository);
  }

  create(userId, cardNumber, cardType): Promise<PaymentMethod> {
    const paymentMethod = new PaymentMethod();
    paymentMethod.card_number = cardNumber;
    paymentMethod.card_type = cardType;
    paymentMethod.user_id = userId;
    return this.paymentMethodRepository.save(paymentMethod);
  }

  getOne(id: number, userId: number): Promise<PaymentMethod> {
    return this.paymentMethodRepository.findOne({
      where: {
        id,
        user_id: userId,
      },
      select: ['id', 'card_type', 'card_number'],
    });
  }
}
