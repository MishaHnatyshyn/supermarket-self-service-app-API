import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export default class AddToBasketDto {
  @ApiModelProperty()
  @IsNumber()
  basketId: number;

  @ApiModelProperty()
  @IsNumber()
  productId: number;

  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  quantity: number;
}
