import { ApiResponseModelProperty } from '@nestjs/swagger';
import AddressDto from './address.dto';

export default class StoreDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  address_id: number;

  @ApiResponseModelProperty({ type: AddressDto })
  address: AddressDto;
}
