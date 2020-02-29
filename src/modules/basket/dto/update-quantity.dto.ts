import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class UpdateQuantityDto {
  @ApiModelProperty()
  @IsNumber()
  quantity: number;
}
