import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import AuthModule from './modules/auth';
import CategoryModule from './modules/category';
import ProductModule from './modules/product';

@Module({
  imports: [DatabaseModule, AuthModule, CategoryModule, ProductModule],
})
export class AppModule {}
