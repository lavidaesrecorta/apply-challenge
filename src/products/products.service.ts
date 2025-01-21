import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}


  async createOrUpdate(createProductDto: CreateProductDto) {
    const response = await this.productsRepository.upsert(createProductDto, ['sku']);
    console.log(response);
  }

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
    product.deletedAt = updateProductDto.deletedAt
    return this.entityManager.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
