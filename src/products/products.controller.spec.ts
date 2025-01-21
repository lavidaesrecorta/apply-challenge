import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  PaginatedResult,
  PriceRange,
} from './interfaces/paginatedResult.interface';

// Mock the ProductsService
const mockProductsService = {
  findPaginated: jest.fn(),
  softDelete: jest.fn(),
};

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('findPaginated', () => {
    it('should return paginated products', async () => {
      const page = 1;
      const filter = '{"name":"product1"}'; // Example filter
      const priceRange = '{"min":10,"max":100}'; // Example price range
      const parsedFilter: Partial<CreateProductDto> = { name: 'product1' };
      const parsedPriceRange: PriceRange = { min: 10, max: 100 };
      const expectedResult: PaginatedResult = {
        data: [],
        total: 0,
        pageNumber: 1,
        totalPages: 10,
      };

      mockProductsService.findPaginated.mockResolvedValue(expectedResult);

      const result = await productsController.findPaginated(
        page,
        filter,
        priceRange,
      );

      expect(result).toEqual(expectedResult);
      expect(mockProductsService.findPaginated).toHaveBeenCalledWith(
        page,
        parsedFilter,
        parsedPriceRange,
      );
    });

    it('should return empty array if no products found', async () => {
      const page = 1;
      const filter = '{"name":"product1"}'; // Example filter
      const priceRange = '{"min":10,"max":100}'; // Example price range
      const parsedFilter: Partial<CreateProductDto> = { name: 'product1' };
      const parsedPriceRange: PriceRange = { min: 10, max: 100 };
      const expectedResult: PaginatedResult = {
        data: [],
        total: 0,
        pageNumber: 1,
        totalPages: 10,
      };

      mockProductsService.findPaginated.mockResolvedValue(expectedResult);

      const result = await productsController.findPaginated(
        page,
        filter,
        priceRange,
      );

      expect(result).toEqual(expectedResult);
      expect(mockProductsService.findPaginated).toHaveBeenCalledWith(
        page,
        parsedFilter,
        parsedPriceRange,
      );
    });
  });

  describe('removeId', () => {
    it('should remove a product by id', async () => {
      const id = '1';

      mockProductsService.softDelete.mockResolvedValue(undefined);

      await productsController.removeId(id);

      expect(mockProductsService.softDelete).toHaveBeenCalledWith(+id);
    });
  });

  describe('removeSku', () => {
    it('should remove a product by SKU', async () => {
      const sku = 'ABC123';

      mockProductsService.softDelete.mockResolvedValue(undefined);

      await productsController.removeSku(sku);
    });
  });
});
