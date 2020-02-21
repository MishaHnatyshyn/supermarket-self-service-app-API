import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import categoryProviders from './providers/category.providers';
import CategoryService from './services/category.service';
import CategoryRepositoryService from './services/category-repository.service';
import CategoryController from './controllers/category.controller';

@Module({
  controllers: [CategoryController],
  imports: [DatabaseModule],
  providers: [
    ...categoryProviders,
    CategoryRepositoryService,
    CategoryService,
  ],
  exports: [CategoryService],
})

export default class CategoryModule {}
