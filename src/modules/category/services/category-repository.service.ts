import { Injectable, Inject } from '@nestjs/common';
import {Repository} from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { CATEGORY_REPOSITORY } from '../../../constants';
import Category from '../../database/entities/category/category.entity';

@Injectable()
export default class CategoryRepositoryService extends BaseRepositoryService<Category> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  getAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      select: ['name', 'id'],
      relations: ['subcategories'],
      order: {
        name: 'ASC',
      },
    });
  }
}
