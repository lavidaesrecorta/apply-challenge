import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    constructor(product: Partial<Product>){
        Object.assign(this,product)
    }
}
