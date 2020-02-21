import {ApiResponseModelProperty} from '@nestjs/swagger';
import ProductCharacteristic from '../../database/entities/product-characteristic/product-characteristic.entity';
import UnitOfMeasure from '../../database/entities/product/unit-of-measure.entity';
import Category from '../../database/entities/category/category.entity';
import Currency from '../../database/entities/product/currency.entity';
import Producer from '../../database/entities/producer/producer.entity';

export default class ProductDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  barcode: string;

  @ApiResponseModelProperty()
  producer: Producer;

  @ApiResponseModelProperty()
  currency: Currency;

  @ApiResponseModelProperty()
  category: Category;

  @ApiResponseModelProperty()
  unit_of_measure: UnitOfMeasure;

  @ApiResponseModelProperty()
  characteristics: ProductCharacteristic[];

  @ApiResponseModelProperty()
  price: number;
}
