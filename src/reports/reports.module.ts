import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [ProductsService],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
