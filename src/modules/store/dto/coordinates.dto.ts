import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class CoordinatesDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  latitude: number;

  @ApiResponseModelProperty()
  longitude: number;
}
