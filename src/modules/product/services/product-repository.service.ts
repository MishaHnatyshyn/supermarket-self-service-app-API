import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { PRODUCT_REPOSITORY } from '../../../constants';
import Product from '../../database/entities/product/product.entity';

@Injectable()
export default class ProductRepositoryService extends BaseRepositoryService<Product> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>,
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
}
