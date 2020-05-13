import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity, OneToMany,
} from 'typeorm';
import PaymentMethod from '../payment/paymentMethod.entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false, unique: true })
  email: string;

  @Column({ length: 500, nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => PaymentMethod, payment => payment.user)
  paymentMethods: PaymentMethod[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
