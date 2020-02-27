import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Store from '../store/store.entity';
import Product from './product.entity';

@Entity()
export default class ProductInStore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  product_id: number;

  @Column()
  store_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  stores: Store;
}
