import {IsNotEmpty, IsString, IsNumber, IsObject, IsOptional} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';

export default class SearchQueryDto {
  @IsOptional()
  @ApiModelProperty()
  @IsString()
  search: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  storeId: number;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsObject()
  filters?: {
    [key: string]: string;
  };

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  priceMin?: number;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  priceMax?: number;
}
