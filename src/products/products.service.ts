import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Between, EntityManager, MoreThanOrEqual, Repository } from 'typeorm';
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

    const existingProduct = await this.productsRepository.findOne({
      where: { sku: createProductDto.sku },
      withDeleted: true
    });
    if (existingProduct) {
      // If the product is soft-deleted, we update new values from contentful but still wont show in the rest API.
      return await this.productsRepository.save(existingProduct)      
    }
    return await this.create(createProductDto)
  }

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto)
    return await this.entityManager.save(product);
  }

  async findAll() {
    return this.productsRepository.find()
  }

  async findOne(id: number) {
    return this.productsRepository.findOneBy({id});
  }

  async findPaginated(pageNumber: number = 1, filter: Partial<CreateProductDto>, priceRange?: PriceRange): Promise<PaginatedResult> {
    const take = 5
    const skip = (pageNumber - 1) * take

    delete filter.price
    let priceFilter = MoreThanOrEqual(0)

    if (priceRange != null) {
      priceFilter = Between(priceRange.min,priceRange.max)
    }

    const [data,total] = await this.productsRepository.findAndCount({
      take,
      skip,
      where: { ...filter, price: priceFilter }
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

  async softDelete(id?: number, sku?: string) {
    if (id != null) {
      return this.productsRepository
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id })
      .execute();
    }
    if (sku != null) {
      return this.productsRepository
      .createQueryBuilder()
      .softDelete()
      .where("sku = :sku", { sku })
      .execute();
    }

    return false
  }
  async restoreSoftDeleted(id?: number, sku?: string){
    if (id != null || id != 0) {
      return this.productsRepository.restore(id)
    }
    if (sku != null) {
       this.productsRepository
      .createQueryBuilder()
      .withDeleted()
      .update({deletedAt: null})
      .where("sku = :sku", { sku })
      .execute();
    }
    return false
  }
}
