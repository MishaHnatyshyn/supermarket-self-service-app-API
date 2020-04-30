import { ApiResponseModelProperty } from '@nestjs/swagger';

export class CategoryTreeDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  icon: string;

  @ApiResponseModelProperty({ type: [CategoryTreeDto] })
  subcategories: CategoryTreeDto[];
}
