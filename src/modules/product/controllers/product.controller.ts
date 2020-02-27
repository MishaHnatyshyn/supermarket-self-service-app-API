import {
  Controller, Get, Param, Query,
} from '@nestjs/common';
import {ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import ProductService from '../services/product.service';
import ProductDto from '../dto/product.dto';
import IdDto from '../../../shared/dto/id.dto';
import SearchQueryParamsPipe from '../../../shared/search-query-params.pipe';
import SearchQueryDto from '../dto/search-query.dto';
import ProductSearchDto from '../dto/product-search.dto';

@ApiUseTags('products')
@Controller('products')
export default class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({ type: ProductDto })
  @Get(':id')
  getProduct(@Param() { id }: IdDto): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }

  @ApiOkResponse({ type: ProductSearchDto })
  @Get()
  searchProduct(@Query(SearchQueryParamsPipe) query: SearchQueryDto): Promise<ProductSearchDto> {
    return this.productService.searchProducts(query);
  }
}
