import {Connection, Repository} from 'typeorm';
import { DB_CONNECTION, CATEGORY_REPOSITORY } from '../../../constants';
import Category from '../../database/entities/category/category.entity';

export default [
  {
    provide: CATEGORY_REPOSITORY,
    useFactory: (connection: Connection): Repository<Category> => connection.getRepository(Category),
    inject: [DB_CONNECTION],
  },
];
