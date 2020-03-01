import {Connection, Repository} from 'typeorm';
import { DB_CONNECTION, STORE_REPOSITORY } from '../../../constants';
import Store from '../../database/entities/store/store.entity';

export default [
  {
    provide: STORE_REPOSITORY,
    useFactory: (connection: Connection): Repository<Store> => connection.getRepository(Store),
    inject: [DB_CONNECTION],
  },
];
