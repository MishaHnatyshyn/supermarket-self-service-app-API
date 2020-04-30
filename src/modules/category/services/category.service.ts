import { Injectable } from '@nestjs/common';
import CategoryRepositoryService from './category-repository.service';
import {CategoryTreeDto} from '../dto/category.dto';

@Injectable()
export default class CategoryService {
  constructor(private readonly categoryRepositoryService: CategoryRepositoryService) {}

  async getCategoriesTree(): Promise<CategoryTreeDto[]> {
    return this.categoryRepositoryService.getAll();
  }
}
