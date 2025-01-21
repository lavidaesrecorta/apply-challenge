import { Product } from '../entities/product.entity';

export interface PaginatedResult {
  data: Product[];
  total: number;
  pageNumber: number;
  totalPages: number;
}

export interface PriceRange {
  max: number;
  min: number;
}

export interface DateRange {
  max: Date;
  min: Date;
}
