import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Producer from '../producer/producer.entity';
import Category from '../category/category.entity';
import UnitOfMeasure from './unit-of-measure.entity';

@Entity()
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  producer_id: number;

  @ManyToOne(() => Producer)
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;

  @Column()
  category_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  unit_of_measure_id: number;

  @ManyToOne(() => UnitOfMeasure)
  @JoinColumn({ name: 'unit_of_measure_id' })
  unit_of_measure: UnitOfMeasure;

  @Column()
  price: number;
}
