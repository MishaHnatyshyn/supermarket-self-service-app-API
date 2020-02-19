import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity, ManyToOne, JoinColumn,
} from 'typeorm';
import ProductCharacteristicType from './product-characteristic-type.entity';
import Product from '../product/product.entity';

@Entity()
export default class ProductCharacteristic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  type_id: number;

  @ManyToOne(() => ProductCharacteristicType)
  @JoinColumn({ name: 'type_id' })
  type: ProductCharacteristicType;

  @Column()
  value: string;
}
