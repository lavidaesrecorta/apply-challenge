import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResult, PriceRange } from './interfaces/paginatedResult.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async findPaginated(
    @Query('page') page: number = 1, // Default to 1 if no page is provided
    @Query('filter') filter: string,
    @Query('priceRange') priceRange: string,
): Promise<PaginatedResult>  {
    const parsedFiler : Partial<CreateProductDto> = filter ? JSON.parse(decodeURIComponent(filter)) : {};
    const parsedPriceRange : PriceRange = priceRange ? JSON.parse(decodeURIComponent(priceRange)) : {};
    return this.productsService.findPaginated(page, parsedFiler, parsedPriceRange);
  }

    @Delete(':id')
  async remove(@Param('id') id?: string, @Param('sku') sku?: string) {
    await this.productsService.softDelete(+id, sku);
  }

  // --- Default CRUD methods ---

  // @Post()
  // async create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  // @Get()
  // async findAll() {
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    
  //   await this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   await this.productsService.remove(+id);
  // }
}
