export class CreateProductDto {
    sku: string;
    locale: string;
    name: string;
    brand: string;
    model: string;
    category: string;
    color: string;
    price: string;
    currency: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
