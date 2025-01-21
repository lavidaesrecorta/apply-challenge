import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Between, EntityManager, IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DateRange, PaginatedResult, PriceRange } from './interfaces/paginatedResult.interface';

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

  async findPaginated(pageNumber: number = 1, filter: Partial<CreateProductDto>, priceRange?: PriceRange): Promise<PaginatedResult> {
    const take = 5
    const skip = (pageNumber - 1) * take

    delete filter.price
    let priceFilter = MoreThanOrEqual(0)

    if (priceRange != null && priceRange.max >= priceRange.min) {
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

  async getNonDeletedCount(priceRange: PriceRange, dateRange: DateRange){

    const queryBuilder = this.productsRepository.createQueryBuilder()
    if (priceRange != null) {
      if (priceRange.max >= priceRange.min) {
      const priceFilter = Between(priceRange.min,priceRange.max)
      queryBuilder.where({price: priceFilter})
    }
  }

    if (dateRange != null) {
      const dateFilter = Between(dateRange.min,dateRange.max)
      queryBuilder.andWhere([
        {contentfulCreatedAt: dateFilter},
        {contentfulUpdatedAt: dateFilter}
      ])
    }

    const nonDeletedCount = await queryBuilder.getCount()   
    const totalCount = await queryBuilder.withDeleted().getCount();
    return [totalCount,nonDeletedCount] 
  }

  async getAvgPrice(category?: string){

    const queryBuilder = this.productsRepository.createQueryBuilder().select('AVG(Product.price)', 'averagePrice')
    if (category != null) {
      queryBuilder.where('LOWER(Product.category) = LOWER(:category)', { category })
    }
    const averagePrice = await queryBuilder.getRawOne()
    return averagePrice
  }

  // Default CRUD methods below...

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

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({id})
    //add update logic
    return this.entityManager.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.delete(id);
  }

 
}
