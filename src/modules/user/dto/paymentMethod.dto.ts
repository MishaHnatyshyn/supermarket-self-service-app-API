import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class PaymentMethodDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  card_number: string;

  @ApiResponseModelProperty()
  card_type: string;
}
