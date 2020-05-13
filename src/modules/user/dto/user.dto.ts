import { ApiResponseModelProperty } from '@nestjs/swagger';
import PaymentMethodDto from './paymentMethod.dto';

export default class UserDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty({ type: [PaymentMethodDto] })
  paymentMethods: PaymentMethodDto[];
}
