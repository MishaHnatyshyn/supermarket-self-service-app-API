import {
  Controller, Get, Param,
} from '@nestjs/common';
import {ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import ProductService from '../services/product.service';
import ProductDto from '../dto/product.dto';
import {IdDto} from '../../../shared/dto/id.dto';

@ApiUseTags('products')
@Controller('products')
export default class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({ type: ProductDto })
  @Get(':id')
  getProduct(@Param() { id }: IdDto): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }
}
