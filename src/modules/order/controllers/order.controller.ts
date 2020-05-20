import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import OrderService from '../services/order.service';
import CreateOrderDto from '../dto/create-order.dto';
import IdDto from '../../../shared/dto/id.dto';
import OrderDetailsDto from '../dto/order-details.dto';
import NewOrderDto from '../dto/new-order.dto';
import DeleteResultDto from '../../../shared/dto/delete-result.dto';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '../../auth/strategies/optional-auth.guard';
import OrderIdsDto from '../dto/order-ids.dto';
import OrderListDto from '../dto/order-list.dto';

@ApiUseTags('order')
@Controller('order')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiCreatedResponse({ type: NewOrderDto })
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  createOrder(@Body() orderData: CreateOrderDto, @Request() { user }): Promise<NewOrderDto> {
    return this.orderService.createOrder(orderData, user?.id);
  }

  @ApiOkResponse({ type: OrderDetailsDto })
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  getOrder(@Param() { id }: IdDto, @Request() { user }): Promise<OrderDetailsDto> {
    return this.orderService.getOrderDetails(id, user?.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getOrdersList(
    @Query() { 'orders[]': orders }: OrderIdsDto,
      @Request() { user },
  ): Promise<OrderListDto> {
    return this.orderService.getOrdersList(orders, user?.id);
  }

  @ApiOkResponse({ type: DeleteResultDto })
  @UseGuards(AuthGuard('user'))
  @Delete(':id')
  deleteOrder(@Param() { id }: IdDto, @Request() { user }): Promise<object> {
    return this.orderService.deleteOrder(id, user.id);
  }
}
