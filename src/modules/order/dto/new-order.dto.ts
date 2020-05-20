import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class NewOrderDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  transactionId: number;

  @ApiResponseModelProperty()
  status: string;

  @ApiResponseModelProperty()
  sum: number;

  @ApiResponseModelProperty()
  timestamp: string;
}

