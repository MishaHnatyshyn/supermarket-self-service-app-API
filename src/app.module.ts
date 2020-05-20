import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import AuthModule from './modules/auth';
import CategoryModule from './modules/category';
import ProductModule from './modules/product';
import BasketModule from './modules/basket';
import StoreModule from './modules/store';
import OrderModule from './modules/order';
import PaymentModule from './modules/payment';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    BasketModule,
    StoreModule,
    PaymentModule,
    OrderModule,
  ],
})
export class AppModule {}
