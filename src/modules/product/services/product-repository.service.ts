import { Injectable, Inject } from '@nestjs/common';
import {In, Like, Repository, MoreThanOrEqual, LessThanOrEqual} from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import {PRODUCT_CHARACTERISTIC_REPOSITORY, PRODUCT_REPOSITORY} from '../../../constants';
import Product from '../../database/entities/product/product.entity';
import ProductCharacteristic from '../../database/entities/product-characteristic/product-characteristic.entity';
import ProductCharacteristicType from '../../database/entities/product-characteristic/product-characteristic-type.entity';
import ProductSearchDbResponse from '../interfaces/product-search-db-response.interface';
import ProductCharacteristicDbResponse from '../interfaces/product-characteristic-db-response.interface';

@Injectable()
export default class ProductRepositoryService extends BaseRepositoryService<Product> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>,
    @Inject(PRODUCT_CHARACTERISTIC_REPOSITORY)
    private readonly productCharacteristicRepository: Repository<ProductCharacteristic>,
  ) {
    super(productRepository);
  }

  getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id, {
      select: ['id', 'price', 'barcode', 'name'],
      relations: [
        'producer',
        'category',
        'unit_of_measure',
        'characteristics',
        'characteristics.type',
      ],
    });
  }

  getProductsCharacteristics(products: number[]): Promise<ProductCharacteristicDbResponse[]> {
    return this.productCharacteristicRepository
      .createQueryBuilder('characteristic')
      .select([
        'product_id',
        'value',
        'type.name as name',
      ])
      .innerJoin(ProductCharacteristicType, 'type', 'type.id=characteristic.type_id')
      .where({ product_id: In(products) })
      .getRawMany();
  }

  getManyProducts(searchTerm, storeId, page, pageSize, filters): Promise<ProductSearchDbResponse[]> {
    const skip = (page - 1) * pageSize;
    const baseQuery = this.productRepository
      .createQueryBuilder('product')
      .select([
        '"product"."id" AS "id"',
        '"product"."name" AS "name"',
        '"product"."barcode" AS "barcode"',
        '"product"."price" AS "price"',
        '"rangeInStore"."quantity" AS "quantity"',
        '"currency"."code" AS "currency_code"',
        '"category"."id" AS "category_id"',
        '"category"."name" AS "category_name"',
        '"producer"."id" AS "producer_id"',
        '"producer"."name" AS "producer_name"',
        '"unit_of_measure"."name" AS "unit_of_measure"',
        'count(*) OVER() as "total"',
        'MIN("product"."price") OVER() as "min_price"',
        'MAX("product"."price") OVER() as "max_price"',
      ])
      .where({ name: Like(`%${searchTerm}%`) });
    const formattedFilters = ProductRepositoryService.formFilters(filters);
    let queryWithFilters = baseQuery;

    formattedFilters.forEach(filter => {
      queryWithFilters = queryWithFilters.andWhere(filter);
    });

    return queryWithFilters
      .innerJoin(
        'product_in_store',
        'rangeInStore',
        '"rangeInStore"."product_id"="product"."id" AND "rangeInStore"."store_id" = :storeId', { storeId })
      .leftJoin('currency', 'currency', '"currency"."id"="product"."currency_id"')
      .leftJoin('category', 'category', '"category"."id"="product"."category_id"')
      .leftJoin('producer', 'producer', '"producer"."id"="product"."producer_id"')
      .leftJoin('unit_of_measure', 'unit_of_measure', '"unit_of_measure"."id"="product"."unit_of_measure_id"')
      .limit(pageSize)
      .offset(skip)
      .getRawMany();
  }


  private static formFilters(searchParams) {
    const filters = [];
    // TODO: use 'otherFilters' in SQL query
    const { priceMin, priceMax, category, producer, ...otherFilters } = searchParams;
    if (priceMin) {
      filters.push({ price: MoreThanOrEqual(parseFloat(priceMin)) });
    }
    if (priceMax) {
      filters.push({ price: LessThanOrEqual(parseFloat(priceMax)) });
    }
    if (category) {
      filters.push({ category_id: In(category) });
    }
    if (producer) {
      filters.push({ producer_id: In(producer) });
    }
    return filters;
  }

}
