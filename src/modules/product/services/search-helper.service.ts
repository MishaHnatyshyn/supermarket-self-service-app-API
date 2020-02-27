import { Injectable } from '@nestjs/common';
import ProductPreviewDto from '../dto/product-preview.dto';
import ProductSearchFilteringDataDto from '../dto/product-search-filtering-data.dto';
import ProductSearchPagingDataDto from '../dto/product-search-paging-data.dto';
import ProductSearchDbResponse from '../interfaces/product-search-db-response.interface';
import ProductCharacteristicDbResponse from '../interfaces/product-characteristic-db-response.interface';

@Injectable()
export default class SearchHelperService {
  static formProductsPreviewDto(
    products: ProductSearchDbResponse[],
  ): ProductPreviewDto[] {
    const data: ProductPreviewDto[] = products.map(product => {
      const {
        currency_code,
        unit_of_measure,
        price,
        id,
        name,
        barcode,
        quantity,
      } = product;
      return {
        id,
        name,
        price,
        barcode,
        quantity,
        unitOfMeasure: unit_of_measure,
        currency: currency_code,
      };
    });

    return data;
  }

  static formSearchPagingMetadata(
    products: ProductSearchDbResponse[],
    page: number,
    pageSize: number,
  ): ProductSearchPagingDataDto {
    const totalCount = products[0] ? parseInt(products[0].total, 10) : 0;
    const paging: ProductSearchPagingDataDto = {
      page,
      pageSize,
      pageItemsCount: products.length,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
    return paging;
  }

  static formSearchFilteringData(
    products: ProductSearchDbResponse[],
  ): ProductSearchFilteringDataDto {
    const product = products[0];
    if (!product) {
      return null;
    }
    const filtering = {
      minPrice: parseInt(product.min_price, 10),
      maxPrice: parseInt(product.max_price, 10),
      categories: [],
      producers: [],
    };
    const { categories, producers } = products.reduce(
      (acc, curr) => {
        const { category_name, category_id, producer_name, producer_id } = curr;
        if (!acc.categories.some(category => category.id === category_id)) {
          acc.categories.push({ name: category_name, id: category_id });
        }
        if (!acc.producers.some(producer => producer.id === producer_id)) {
          acc.producers.push({ name: producer_name, id: producer_id });
        }
        return acc;
      },
      { categories: [], producers: [] },
    );
    filtering.categories = categories;
    filtering.producers = producers;
    return filtering;
  }

  static formatCharacteristicsToFilters(
    characteristics: ProductCharacteristicDbResponse[],
  ): any {
    return characteristics.reduce((acc, curr) => {
      const { name, value } = curr;
      const currentCharacteristicInFilters = acc[name];
      if (currentCharacteristicInFilters && !currentCharacteristicInFilters.includes(value)) {
        currentCharacteristicInFilters.push(value);
      } else if (!currentCharacteristicInFilters) {
        acc[name] = [value];
      }
      return acc;
    }, {});
  }
}
