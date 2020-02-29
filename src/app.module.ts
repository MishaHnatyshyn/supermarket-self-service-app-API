import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import AuthModule from './modules/auth';
import CategoryModule from './modules/category';
import ProductModule from './modules/product';
import BasketModule from './modules/basket';

@Module({
  imports: [DatabaseModule, AuthModule, CategoryModule, ProductModule, BasketModule],
})
export class AppModule {}
