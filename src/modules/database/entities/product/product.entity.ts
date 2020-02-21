import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import Producer from '../producer/producer.entity';
import Category from '../category/category.entity';
import UnitOfMeasure from './unit-of-measure.entity';
import ProductCharacteristic from '../product-characteristic/product-characteristic.entity';
import Store from '../store/store.entity';
import Currency from './currency.entity';

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
  currency_id: number;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

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

  @OneToMany(() => ProductCharacteristic, characteristic => characteristic.product)
  characteristics: ProductCharacteristic[];

  @ManyToMany(() => Store, store => store.products)
  @JoinTable()
  stores: Store[];

  @Column()
  price: number;
}
