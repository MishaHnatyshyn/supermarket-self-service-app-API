import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class PaymentDetailsDto {
  @ApiResponseModelProperty()
  transaction_id: number;

  @ApiResponseModelProperty()
  card_number: string;

  @ApiResponseModelProperty()
  card_type: string;

  @ApiResponseModelProperty()
  timestamp: string;
}

