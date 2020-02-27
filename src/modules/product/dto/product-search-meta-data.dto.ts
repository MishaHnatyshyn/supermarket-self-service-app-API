import {ApiResponseModelProperty} from '@nestjs/swagger';
import ProductSearchFilteringDataDto from './product-search-filtering-data.dto';
import ProductSearchPagingDataDto from './product-search-paging-data.dto';

export default class ProductSearchMetaDataDto {
  @ApiResponseModelProperty({ type: ProductSearchPagingDataDto })
  paging: ProductSearchPagingDataDto;

  @ApiResponseModelProperty({ type: ProductSearchFilteringDataDto })
  filtering: ProductSearchFilteringDataDto;

  currentFilters: any;
}
