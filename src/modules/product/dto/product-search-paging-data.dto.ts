import {ApiResponseModelProperty} from '@nestjs/swagger';

export default class ProductSearchPagingDataDto {
  @ApiResponseModelProperty()
  page: number;

  @ApiResponseModelProperty()
  pageSize: number;

  @ApiResponseModelProperty()
  pageItemsCount: number;

  @ApiResponseModelProperty()
  totalCount: number;

  @ApiResponseModelProperty()
  totalPages: number;
}
