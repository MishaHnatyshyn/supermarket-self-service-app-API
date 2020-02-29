import {Connection, Repository} from 'typeorm';
import { DB_CONNECTION, BASKET_REPOSITORY, BASKET_LINE_ITEM_REPOSITORY } from '../../../constants';
import Basket from '../../database/entities/basket/basket.entity';
import BasketLineItem from '../../database/entities/basket/basket-line-item.entity';

export default [
  {
    provide: BASKET_REPOSITORY,
    useFactory: (connection: Connection): Repository<Basket> => connection.getRepository(Basket),
    inject: [DB_CONNECTION],
  },
  {
    provide: BASKET_LINE_ITEM_REPOSITORY,
    useFactory: (connection: Connection): Repository<BasketLineItem> => connection.getRepository(BasketLineItem),
    inject: [DB_CONNECTION],
  },
];
