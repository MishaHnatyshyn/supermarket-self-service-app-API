import { Injectable } from '@nestjs/common';
import CategoryRepositoryService from './category-repository.service';
import Category from '../../database/entities/category/category.entity';
import {CategoryTreeDto} from '../dto/category.dto';

@Injectable()
export default class CategoryService {
  constructor(private readonly categoryRepositoryService: CategoryRepositoryService) {}

  private static mapSubcategoriesIds(categories: Category[]): CategoryTreeDto[] {
    return categories.map((category) => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => subcategory.id),
    }));
  }

  async getCategoriesTree(): Promise<CategoryTreeDto[]> {
    const categories = await this.categoryRepositoryService.getAll();
    return CategoryService.mapSubcategoriesIds(categories);
  }
}
