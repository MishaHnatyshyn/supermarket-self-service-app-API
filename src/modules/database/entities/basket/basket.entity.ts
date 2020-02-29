import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '../user/user.entity';
import BasketLineItem from './basket-line-item.entity';

@Entity()
export default class Basket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'in progress' | 'paid' | 'error';

  @Column({ nullable: true })
  user_id: number;

  @Column()
  store_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => BasketLineItem, item => item.basket)
  items: BasketLineItem[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
