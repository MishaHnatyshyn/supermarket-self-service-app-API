import {Connection, Repository} from 'typeorm';
import { DB_CONNECTION, PAYMENT_METHOD_REPOSITORY } from '../../../constants';
import PaymentMethod from '../../database/entities/payment/paymentMethod.entity';

export default [
  {
    provide: PAYMENT_METHOD_REPOSITORY,
    useFactory: (connection: Connection): Repository<PaymentMethod> => connection.getRepository(PaymentMethod),
    inject: [DB_CONNECTION],
  },
];
