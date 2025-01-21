import { Injectable } from '@nestjs/common';
import {
  DateRange,
  PriceRange,
} from 'src/products/interfaces/paginatedResult.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReportsService {
  constructor(private readonly productsService: ProductsService) {}

  async getDeletedPercentage() {
    const [total, nonDeleted] = await this.productsService.getNonDeletedCount();
    const deleted = total - nonDeleted;
    const deletedPercentage = (deleted / total) * 100;
    return deletedPercentage;
  }

  async getNonDeletedPercentage(priceRange: PriceRange, dateRange: DateRange) {
    const [total, nonDeleted] = await this.productsService.getNonDeletedCount(
      priceRange,
      dateRange,
    );
    const nonDeletedPercentage = (nonDeleted / total) * 100;
    return nonDeletedPercentage;
  }

  async getAvgPriceByCategory(category?: string) {
    const avgPrice = await this.productsService.getAvgPrice(category);
    return avgPrice;
  }
}
