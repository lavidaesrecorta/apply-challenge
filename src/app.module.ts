import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ContentfulApiService } from './contentful-api/contentful-api.service';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    ContentfulApiModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ContentfulApiService],
})
export class AppModule {}
