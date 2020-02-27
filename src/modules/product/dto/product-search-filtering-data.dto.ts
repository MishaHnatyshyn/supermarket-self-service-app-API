import {ApiResponseModelProperty} from '@nestjs/swagger';

export default class ProductSearchFilteringDataDto {
  @ApiResponseModelProperty()
  minPrice: number;

  @ApiResponseModelProperty()
  maxPrice: number;

  @ApiResponseModelProperty()
  categories: { name: string; id: number }[];

  @ApiResponseModelProperty()
  producers: { name: string; id: number }[];

  [key: string]: unknown
}
