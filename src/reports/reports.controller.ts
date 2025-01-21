import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  DateRange,
  PriceRange,
} from 'src/products/interfaces/paginatedResult.interface';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('percentage/non-deleted')
  async getNonDeletedPercent(
    @Query('priceRange') priceRange: string,
    @Query('dateRange') dateRange: string,
  ) {
    const parsedPriceRange: PriceRange | null = priceRange
      ? JSON.parse(decodeURIComponent(priceRange))
      : null;
    const parsedDateRange: DateRange | null = dateRange
      ? JSON.parse(decodeURIComponent(dateRange))
      : null;
    return {
      nonDeletedPercentage: await this.reportsService.getNonDeletedPercentage(
        parsedPriceRange,
        parsedDateRange,
      ),
    };
  }

  @Get('percentage/deleted')
  async getDeletedPercent() {
    return { deletedPercentage: await this.reportsService.getDeletedPercentage() };
  }

  @Get('avg-price')
  async getAvgPriceByCategory(@Query('category') category: string) {
    const parsedCategory: string | null = category
      ? decodeURIComponent(category)
      : null;
    return {
      avgPrice: await this.reportsService.getAvgPriceByCategory(parsedCategory),
    };
  }
}
