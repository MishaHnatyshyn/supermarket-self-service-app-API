import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity, ManyToMany, JoinTable, ManyToOne, JoinColumn,
} from 'typeorm';
import Product from '../product/product.entity';
import Address from './address.entity';

@Entity()
export default class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address_id: number;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => Product, product => product.stores)
  @JoinTable()
  products: Product[];
}
