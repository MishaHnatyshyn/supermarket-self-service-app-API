import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import AuthModule from './modules/auth';
import CategoryModule from './modules/category';
import ProductModule from './modules/product';
import BasketModule from './modules/basket';
import StoreModule from './modules/store';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    BasketModule,
    StoreModule,
  ],
})
export class AppModule {}
