import { ApiResponseModelProperty } from '@nestjs/swagger';
import PaymentMethodDto from '../../payment/dto/paymentMethod.dto';

export default class UserDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty({ type: [PaymentMethodDto] })
  paymentMethods: PaymentMethodDto[];
}
