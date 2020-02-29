import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class NewBasketStoreIdDto {
  @ApiModelProperty()
  @IsNumber()
  storeId: number;
}
