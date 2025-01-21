import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulApiService } from './contentful-api.service';
import { ProductsService } from 'src/products/products.service';
import { ConfigService } from '@nestjs/config';

global.fetch = jest.fn();

describe('ContentfulApiService', () => {
  let service: ContentfulApiService;
  let productsService: ProductsService;
  let configService: ConfigService;

  const mockCreateOrUpdate = jest.fn();
  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'CONTENTFUL_SPACE_ID') return 'mock_space_id';
      if (key === 'CONTENTFUL_ACCESS_TOKEN') return 'mock_access_token';
      if (key === 'CONTENTFUL_ENVIRONMENT') return 'mock_environment';
      if (key === 'CONTENTFUL_CONTENT_TYPE') return 'mock_content_type';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulApiService,
        {
          provide: ProductsService,
          useValue: { createOrUpdate: mockCreateOrUpdate },
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ContentfulApiService>(ContentfulApiService);
    productsService = module.get<ProductsService>(ProductsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should construct the baseUrl and fetch data from Contentful', async () => {
    const mockData = {
      items: [
        {
          metadata: { tags: {}, concepts: {} },
          sys: {
            id: '1',
            locale: 'en-US',
            createdAt: '2021-01-01T00:00:00Z',
            updatedAt: '2021-01-02T00:00:00Z',
          },
          fields: {
            sku: '1',
            name: 'name',
            brand: 'brand',
            model: 'model',
            category: 'cat',
            color: 'color',
            price: 10,
            currency: 'currency',
            stock: 1,
          },
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await service.FetchDataFromContentful();

    // Verify that the baseUrl was constructed correctly
    expect(service.baseUrl).toBe(
      'https://cdn.contentful.com/spaces/mock_space_id/environments/mock_environment/entries?access_token=mock_access_token&content_type=mock_content_type',
    );

    console.log('Expected baseUrl:', service.baseUrl);
    // Verify that fetch was called
    expect(fetch).toHaveBeenCalledWith(service.baseUrl);
  });
});
