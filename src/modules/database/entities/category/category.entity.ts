import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_category_id: number;

  @ManyToOne(type => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'create_by_id' })
  parent_category: Category;

  @OneToMany(type => Category, category => category.parent_category)
  subcategories: Category[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
