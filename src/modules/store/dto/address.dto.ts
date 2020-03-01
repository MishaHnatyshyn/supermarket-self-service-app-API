import { ApiResponseModelProperty } from '@nestjs/swagger';
import CoordinatesDto from './coordinates.dto';

export default class AddressDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  street: string;

  @ApiResponseModelProperty()
  building: string;

  @ApiResponseModelProperty()
  postal_code: string;

  @ApiResponseModelProperty()
  coordinates_id: number;

  @ApiResponseModelProperty({ type: CoordinatesDto })
  coordinates: CoordinatesDto;
}
