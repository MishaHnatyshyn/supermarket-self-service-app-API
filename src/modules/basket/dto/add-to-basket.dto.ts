import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class AddToBasketDto {
  @ApiModelProperty()
  @IsNumber()
  basketId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  productId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  barcode: string;

  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  quantity: number;
}
