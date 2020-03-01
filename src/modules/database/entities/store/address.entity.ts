import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import City from './city.entity';
import Coordinates from './coordinates.entity';

@Entity()
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  building: string;

  @Column()
  postal_code: string;

  @Column()
  city_id: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  country: City;

  @Column({ nullable: true })
  coordinates_id: number;

  @OneToOne(() => Coordinates)
  @JoinColumn({ name: 'coordinates_id' })
  coordinates: Coordinates;
}
