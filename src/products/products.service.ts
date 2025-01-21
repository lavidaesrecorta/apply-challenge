import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Between, EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResult, PriceRange } from './interfaces/paginatedResult.interface';

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

  async findPaginated(pageNumber: number = 1, filter: Partial<CreateProductDto>, priceRange: PriceRange): Promise<PaginatedResult> {
    const take = 5
    const skip = (pageNumber - 1) * take

    delete filter.price

    const [data,total] = await this.productsRepository.findAndCount({
      take,
      skip,
      where: { ...filter, price: Between(priceRange.min,priceRange.max) }
    });

    const totalPages = Math.ceil(total / take);
    return {
      data,
      total,
      pageNumber,
      totalPages
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({id})
    //add update logic
    return this.entityManager.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.delete(id);
  }

  async softDelete(id: number) {
    return this.productsRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
  }
}
