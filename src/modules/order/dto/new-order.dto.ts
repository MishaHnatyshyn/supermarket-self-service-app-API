import { ApiResponseModelProperty } from '@nestjs/swagger';
import PaymentMethodDto from '../../payment/dto/paymentMethod.dto';

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

  @ApiResponseModelProperty()
  paymentMethodData: PaymentMethodDto;
}

