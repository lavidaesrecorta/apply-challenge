import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    private readonly entityManager: EntityManager,
    private readonly productsRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto)
    await this.entityManager.save(product);
  }

  async findAll() {
    return this.productsRepository.find()
  }

  async findOne(id: number) {
    return this.productsRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({id})
    //insert update logic here
    return this.entityManager.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
