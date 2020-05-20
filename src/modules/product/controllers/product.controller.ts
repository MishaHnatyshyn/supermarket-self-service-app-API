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
import ProductBarcodeDto from '../dto/product-barcode.dto';
import ProductShortDto from "../dto/product-short.dto";

@ApiUseTags('products')
@Controller('products')
export default class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({ type: ProductDto })
  @Get(':id')
  getProduct(@Param() { id }: IdDto): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }

  @ApiOkResponse({ type: ProductShortDto })
  @Get('barcode/:barcode')
  getProductByBarcode(@Param() { barcode }: ProductBarcodeDto): Promise<ProductShortDto> {
    return this.productService.getProductByBarcode(barcode, true);
  }

  @ApiOkResponse({ type: ProductSearchDto })
  @Get()
  searchProduct(@Query(SearchQueryParamsPipe) query: SearchQueryDto): Promise<ProductSearchDto> {
    return this.productService.searchProducts(query);
  }
}
