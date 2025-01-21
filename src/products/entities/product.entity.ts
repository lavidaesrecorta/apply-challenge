import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true}) //Should the sku be unique? What if its reused for the same product in different locales?
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
    @Column({ type: "numeric", precision: 10, scale: 2 })
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
    deletedAt: Date;  


    constructor(product: Partial<Product>){
        Object.assign(this,product)
    }
}
``