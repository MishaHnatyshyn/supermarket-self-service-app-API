import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class EmptyBasketDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  createdAt: string;
}
