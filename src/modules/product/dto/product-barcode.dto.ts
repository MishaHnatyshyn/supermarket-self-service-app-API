import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export default class ProductBarcodeDto {
  @ApiModelProperty()
  @IsString()
  barcode: string;
}
