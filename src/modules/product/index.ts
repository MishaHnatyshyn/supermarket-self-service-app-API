import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import productProviders from './providers/product.providers';
import ProductRepositoryService from './services/product-repository.service';
import ProductService from './services/product.service';
import ProductController from './controllers/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ...productProviders,
    ProductRepositoryService,
    ProductService,
  ],
  exports: [ProductService],
})

export default class ProductModule {}
