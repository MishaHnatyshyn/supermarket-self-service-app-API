import { ApiResponseModelProperty } from '@nestjs/swagger';
import LineItemDetailsDto from './line-item-details.dto';
import BasketTotalsDto from './basket-totals.dto';

export default class LineItemDto {
  @ApiResponseModelProperty({ type: LineItemDetailsDto })
  data: LineItemDetailsDto;

  @ApiResponseModelProperty({ type: BasketTotalsDto })
  updatedBasketTotals: BasketTotalsDto;
}

