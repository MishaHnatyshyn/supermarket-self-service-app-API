import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class OrderListItemDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  status: string;

  @ApiResponseModelProperty()
  timestamp: string;

  @ApiResponseModelProperty()
  sum: string;

  @ApiResponseModelProperty()
  store: string;

  @ApiResponseModelProperty()
  building: string;
}
