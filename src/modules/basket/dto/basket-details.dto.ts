import { ApiResponseModelProperty } from '@nestjs/swagger';
import LineItemDetailsDto from './line-item-details.dto';
import BasketTotalsDto from './basket-totals.dto';

export default class BasketDetailsDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  storeId: number;

  @ApiResponseModelProperty({ type: [LineItemDetailsDto] })
  data: LineItemDetailsDto[];

  @ApiResponseModelProperty({ type: BasketTotalsDto })
  totals: BasketTotalsDto;
}

