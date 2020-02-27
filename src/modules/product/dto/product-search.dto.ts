import {ApiResponseModelProperty} from '@nestjs/swagger';
import ProductSearchMetaDataDto from './product-search-meta-data.dto';
import ProductPreviewDto from './product-preview.dto';

export default class ProductSearchDto {
  @ApiResponseModelProperty()
  data: ProductPreviewDto[];

  @ApiResponseModelProperty({ type: ProductSearchMetaDataDto })
  meta: ProductSearchMetaDataDto;
}

