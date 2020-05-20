import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import paymentProviders from './providers/payment.providers';
import PaymentRepositoryService from './services/payment-repository.service';
import PaymentService from './services/payment.service';
import PaymentController from './controllers/payment.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [
    ...paymentProviders,
    PaymentRepositoryService,
    PaymentService,
  ],
  exports: [PaymentService],
})

export default class PaymentModule {}
