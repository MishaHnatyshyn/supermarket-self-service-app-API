import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { ORDER_REPOSITORY } from '../../../constants';
import Order from '../../database/entities/order/order.entity';
import { OrderStatus } from '../interfaces/status.enum';
import Transaction from 'src/modules/database/entities/order/transaction.entity';
import Basket from '../../database/entities/basket/basket.entity';
import Store from '../../database/entities/store/store.entity';
import Address from '../../database/entities/store/address.entity';
import OrderListItemDto from '../dto/order-list-item.dto';

@Injectable()
export default class OrderRepositoryService extends BaseRepositoryService<Order> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  createOrder(basketId: number, userId: number): Promise<Order> {
    const order = new Order();
    order.basket_id = basketId;
    order.user_id = userId;
    order.status = OrderStatus.PAID;
    return this.orderRepository.save(order);
  }

  getOrder(orderId: number): Promise<Order> {
    return this.orderRepository.findOne(orderId, {
      select: ['id', 'created_at', 'basket_id', 'user_id'],
    });
  }

  private getOrdersListBase(matcher): Promise<OrderListItemDto[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.id as id',
        'order.status as status',
        'order.created_at as timestamp',
        'transaction.sum as sum',
        'store.name as store',
        'address.street as street',
        'address.building as building',
      ])
      .where(matcher)
      .innerJoin(Transaction, 'transaction', 'transaction.order_id = order.id')
      .innerJoin(Basket, 'basket', 'basket.id = order.basket_id')
      .innerJoin(Store, 'store', 'basket.store_id = store.id')
      .innerJoin(Address, 'address', 'address.id = store.address_id')
      .getRawMany();
  }

  getOrdersListByIdsList(ids: number[]): Promise<OrderListItemDto[]> {
    const matcher = { id: In(ids) };
    return this.getOrdersListBase(matcher);
  }

  getOrdersListByUserId(userId: number): Promise<OrderListItemDto[]> {
    const matcher = { user_id: userId };
    return this.getOrdersListBase(matcher);
  }
}
