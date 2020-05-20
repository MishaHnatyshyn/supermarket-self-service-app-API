import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export default class OrderIdsDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform((orders) => {
    const array = Array.isArray(orders) ? orders : [orders];
    return array.map(orderId => parseInt(orderId, 10));
  })
  'orders[]': number[];
}
