import { Injectable } from '@nestjs/common';
import ProductRepositoryService from './product-repository.service';
import ProductNotFoundException from '../exceptions/product-not-found.exception';
import ProductDto from '../dto/product.dto';
import SearchQueryDto from '../dto/search-query.dto';
import Range from '../interfaces/rage.interface';
import SearchHelperService from './search-helper.service';
import ProductSearchDto from '../dto/product-search.dto';

@Injectable()
export default class ProductService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async getProduct(id: number): Promise<ProductDto> {
    const product = await this.productRepositoryService.getProductById(id);
    if (!product) {
      throw new ProductNotFoundException({ id });
    }
    return product;
  }

  async getProductByBarcode(barcode: string): Promise<ProductDto> {
    const product = await this.productRepositoryService.getProductByBarcode(barcode);
    if (!product) {
      throw new ProductNotFoundException({ barcode });
    }
    return product;
  }

  async searchProducts(query: SearchQueryDto): Promise<ProductSearchDto> {
    const { filters, priceMin, priceMax, ...searchParams } = query;
    const search = searchParams.search
      ? searchParams.search.trim().toLowerCase()
      : '';
    const page = searchParams.page || 1;
    const pageSize = searchParams.pageSize || 6;

    const currentFilters = { ...filters, priceMin, priceMax };

    const productsData = await this.productRepositoryService.getManyProducts(
      search,
      searchParams.storeId,
      page,
      pageSize,
      currentFilters,
    );

    const paging = SearchHelperService.formSearchPagingMetadata(
      productsData,
      page,
      pageSize,
    );
    const data = SearchHelperService.formProductsPreviewDto(productsData);
    const baseFiltering = SearchHelperService.formSearchFilteringData(productsData);

    let characteristicsFilters = {};

    if (productsData.length) {
      const productIds = productsData.map(product => product.id);

      const characteristics = await this.productRepositoryService.getProductsCharacteristics(
        productIds,
      );

      characteristicsFilters = SearchHelperService.formatCharacteristicsToFilters(characteristics);
    }
    const meta = {
      paging,
      filtering: {
        ...baseFiltering,
        ...characteristicsFilters,
      },
      currentFilters,
    };

    const response = {
      data,
      meta,
    };

    return response;
  }
}
