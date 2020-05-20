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
import PaymentMethod from '../payment/paymentMethod.entity';
import Order from './order.entity';

@Entity()
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  status: 'in progress' | 'paid' | 'error';

  @Column()
  order_id: number;

  @Column({ type: 'float' })
  sum: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: true })
  payment_raw_data: string;

  @Column({ nullable: true })
  payment_method_id: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
