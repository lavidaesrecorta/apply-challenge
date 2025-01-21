import { Injectable } from '@nestjs/common';
import { DateRange, PriceRange } from 'src/products/interfaces/paginatedResult.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReportsService {
    constructor(private readonly productsService: ProductsService) {}

    async getDeletedPercentage(priceRange: PriceRange, dateRange: DateRange) {
        const [total, nonDeleted] = await this.productsService.getNonDeletedCount(priceRange,dateRange)
        console.log(total);
        console.log(nonDeleted);
        
    }
}
