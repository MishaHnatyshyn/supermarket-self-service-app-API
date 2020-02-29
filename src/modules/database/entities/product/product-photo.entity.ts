import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './product.entity';

@Entity()
export default class ProductPhoto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  is_main: boolean;

  @Column()
  url: string;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
