import { ApiResponseModelProperty } from '@nestjs/swagger';

export class CategoryTreeDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty({ type: [Number] })
  subcategories: number[];
}
