import {Connection, Repository} from 'typeorm';
import User from '../../database/entities/user/user.entity';
import { DB_CONNECTION, PAYMENT_METHOD_REPOSITORY, USER_REPOSITORY } from '../../../constants';
import PaymentMethod from '../../database/entities/payment/paymentMethod.entity';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection): Repository<User> => connection.getRepository(User),
    inject: [DB_CONNECTION],
  },
  {
    provide: PAYMENT_METHOD_REPOSITORY,
    useFactory: (connection: Connection): Repository<PaymentMethod> => connection.getRepository(PaymentMethod),
    inject: [DB_CONNECTION],
  },
];
