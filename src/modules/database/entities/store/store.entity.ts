import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
import Product from '../product/product.entity';

@Entity()
export default class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, product => product.stores)
  @JoinTable()
  products: Product[];
}
