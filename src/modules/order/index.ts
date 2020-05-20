import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import orderProviders from './providers/order.providers';
import BasketModule from '../basket';
import OrderRepositoryService from './services/order-repository.service';
import TransactionRepositoryService from './services/transaction-repository.service';
import OrderController from './controllers/order.controller';
import PaymentModule from '../payment';
import OrderService from './services/order.service';
import StoreModule from '../store';

@Module({
  imports: [
    DatabaseModule,
    BasketModule,
    PaymentModule,
    StoreModule,
  ],
  providers: [
    ...orderProviders,
    OrderRepositoryService,
    TransactionRepositoryService,
    OrderService,
  ],
  controllers: [
    OrderController,
  ],
  exports: [],
})

export default class OrderModule {}
