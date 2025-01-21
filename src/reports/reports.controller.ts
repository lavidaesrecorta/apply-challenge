import { Controller, Get, Query } from '@nestjs/common';
import { DateRange, PriceRange } from 'src/products/interfaces/paginatedResult.interface';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
    @Get()
    async getNonDeletedPercent(
        @Query('priceRange') priceRange: string,
        @Query('dateRange') dateRange: string,
  )  {
      const parsedPriceRange : PriceRange | null = priceRange ? JSON.parse(decodeURIComponent(priceRange)) : null;
      const parsedDateRange : DateRange | null = dateRange ? JSON.parse(decodeURIComponent(dateRange)) : null;
      return this.reportsService.getDeletedPercentage(parsedPriceRange, parsedDateRange)
    }

    @Get("avg-price")
    async getAvgPriceByCategory(
        @Query('category') category: string,
    ) {
      const parsedCategory : string | null = category ? decodeURIComponent(category) : null;
        return this.reportsService.getAvgPriceByCategory(parsedCategory)
    }
}
