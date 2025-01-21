import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { ContentfulApiService } from './contentful-api.service';
import { ContentfulApiController } from './contentful-api.controller';

@Module({
  imports: [ConfigModule, ProductsModule],
  providers: [ContentfulApiService],
  controllers: [ContentfulApiController],
})
export class ContentfulApiModule {}
