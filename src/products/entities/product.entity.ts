import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
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
    @Column()
    price: string;
    @Column()
    currency: string;
    @Column()
    stock: number;
    @Column({ type: 'timestamptz' }) // Recommended
    createdAt: Date;
    @Column({ type: 'timestamptz' }) // Recommended
    updatedAt: Date;
    @Column({ type: 'timestamptz', nullable: true }) // Recommended
    deletedAt: Date | null;



    constructor(product: Partial<Product>){
        Object.assign(this,product)
    }
}
``