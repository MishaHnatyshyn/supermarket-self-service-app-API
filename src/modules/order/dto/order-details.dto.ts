import { ApiResponseModelProperty } from '@nestjs/swagger';
import BasketDetailsDto from 'src/modules/basket/dto/basket-details.dto';
import PaymentDetailsDto from './payment-details.dto';
import StoreDto from '../../store/dto/store.dto';

export default class OrderDetailsDto {
  @ApiResponseModelProperty({ type: BasketDetailsDto })
  products: BasketDetailsDto;

  @ApiResponseModelProperty({ type: PaymentDetailsDto })
  paymentDetails: PaymentDetailsDto;

  @ApiResponseModelProperty({ type: StoreDto })
  store: StoreDto;

  @ApiResponseModelProperty()
  timestamp: string;

  @ApiResponseModelProperty()
  status: string;

  @ApiResponseModelProperty()
  id: number;
}
