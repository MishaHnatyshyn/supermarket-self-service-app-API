import BasketTotals from '../interfaces/basket-totals.interface';
import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class BasketTotalsDto implements BasketTotals {
  @ApiResponseModelProperty()
  total: number;

  @ApiResponseModelProperty()
  items: number;

  @ApiResponseModelProperty()
  products: number;
}
