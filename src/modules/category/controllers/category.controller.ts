import {
  Controller, Get,
} from '@nestjs/common';
import {ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import CategoryService from '../services/category.service';
import {CategoryTreeDto} from '../dto/category.dto';

@ApiUseTags('categories')
@Controller('categories')
export default class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOkResponse({ type: [CategoryTreeDto] })
  @Get('')
  getAll(): Promise<CategoryTreeDto[]> {
    return this.categoryService.getCategoriesTree();
  }
}
