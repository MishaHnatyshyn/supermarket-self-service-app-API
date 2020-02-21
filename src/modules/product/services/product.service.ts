import { Injectable } from '@nestjs/common';
import ProductRepositoryService from './product-repository.service';
import ProductNotFoundException from '../exceptions/product-not-found.exception';
import ProductDto from '../dto/product.dto';

@Injectable()
export default class ProductService {
  constructor(private readonly productRepositoryService: ProductRepositoryService) {}

  async getProduct(id: number): Promise<ProductDto> {
    const product = await this.productRepositoryService.getProductById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }
}
