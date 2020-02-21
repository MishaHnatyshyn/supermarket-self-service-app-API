import {Connection, Repository} from 'typeorm';
import {DB_CONNECTION, PRODUCT_CHARACTERISTIC_REPOSITORY, PRODUCT_REPOSITORY} from '../../../constants';
import Product from '../../database/entities/product/product.entity';
import ProductCharacteristic from '../../database/entities/product-characteristic/product-characteristic.entity';

export default [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (connection: Connection): Repository<Product> => connection.getRepository(Product),
    inject: [DB_CONNECTION],
  },
  {
    provide: PRODUCT_CHARACTERISTIC_REPOSITORY,
    useFactory: (connection: Connection): Repository<ProductCharacteristic> => connection.getRepository(ProductCharacteristic),
    inject: [DB_CONNECTION],
  },
];
