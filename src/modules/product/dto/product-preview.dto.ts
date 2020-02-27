import {ApiResponseModelProperty} from '@nestjs/swagger';

export default class ProductPreviewDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  barcode: string;

  @ApiResponseModelProperty()
  currency: string;

  @ApiResponseModelProperty()
  unitOfMeasure: string;
}

