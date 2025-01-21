import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { ContentfulApiService } from './contentful-api.service';

@Module({
    imports: [ConfigModule, ProductsModule],
    providers: [ContentfulApiService]
})
export class ContentfulApiModule {
}
