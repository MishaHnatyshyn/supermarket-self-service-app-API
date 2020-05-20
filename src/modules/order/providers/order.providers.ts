import {Connection, Repository} from 'typeorm';
import {
  DB_CONNECTION,
  TRANSACTION_REPOSITORY,
  ORDER_REPOSITORY,
} from '../../../constants';
import Order from '../../database/entities/order/order.entity';
import Transaction from '../../database/entities/order/transaction.entity';

export default [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (connection: Connection): Repository<Order> => connection.getRepository(Order),
    inject: [DB_CONNECTION],
  },
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (connection: Connection): Repository<Transaction> => connection.getRepository(Transaction),
    inject: [DB_CONNECTION],
  },
];
