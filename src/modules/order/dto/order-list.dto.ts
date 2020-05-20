import OrderListItemDto from './order-list-item.dto';
import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class OrderListDto {
  @ApiResponseModelProperty({ type: [OrderListItemDto] })
  data: OrderListItemDto[];
}
