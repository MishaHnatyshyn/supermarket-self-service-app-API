import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Product from '../product/product.entity';

@Entity()
export default class Producer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @OneToMany(() => Product, product => product.producer)
  products: Product[];
}
