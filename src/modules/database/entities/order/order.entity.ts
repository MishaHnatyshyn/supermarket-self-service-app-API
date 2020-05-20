import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from '../user/user.entity';
import Basket from '../basket/basket.entity';

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  status: 'in progress' | 'paid' | 'error';

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  basket_id: number;

  @OneToOne(() => Basket)
  @JoinColumn({ name: 'basket_id' })
  basket: Basket;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
