import {ApiResponseModelProperty} from '@nestjs/swagger';
import Currency from '../../database/entities/product/currency.entity';

export default class ProductShortDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  barcode: string;

  @ApiResponseModelProperty()
  currency: Currency;

  @ApiResponseModelProperty()
  photo: string;

  @ApiResponseModelProperty()
  price: number;
}
