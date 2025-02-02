import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  sku: string;
  @Column()
  locale: string;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column()
  model: string;
  @Column()
  category: string;
  @Column()
  color: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  currency: string;
  @Column()
  stock: number;
  @Column({ type: 'timestamptz' })
  contentfulCreatedAt: Date;
  @Column({ type: 'timestamptz' })
  contentfulUpdatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
  }
}
``;
