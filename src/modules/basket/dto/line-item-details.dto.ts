import LineItemDetails from '../interfaces/line-item-details.interface';
import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class LineItemDetailsDto implements LineItemDetails {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  product: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  photo: string;

  @ApiResponseModelProperty()
  price: number;

  @ApiResponseModelProperty()
  quantity: number;

  @ApiResponseModelProperty()
  sum: number;
}
