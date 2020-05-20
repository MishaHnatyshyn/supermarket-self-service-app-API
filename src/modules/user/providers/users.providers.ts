import {Connection, Repository} from 'typeorm';
import User from '../../database/entities/user/user.entity';
import { DB_CONNECTION, USER_REPOSITORY } from '../../../constants';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection): Repository<User> => connection.getRepository(User),
    inject: [DB_CONNECTION],
  },
];
