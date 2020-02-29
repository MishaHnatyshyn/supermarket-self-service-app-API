import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from '../product/product.entity';
import Basket from './basket.entity';

@Entity()
export default class BasketLineItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  basket_id: number;

  @Column({ nullable: true })
  product_id: number;

  @ManyToOne(() => Basket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'basket_id' })
  basket: Basket;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
