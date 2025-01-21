import { Controller } from '@nestjs/common';
import { ContentfulApiService } from './contentful-api.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('contentful-api')
export class ContentfulApiController {
  constructor(private readonly contentfulApiService: ContentfulApiService) {}

  async onModuleInit() {
    await this.getFromContentfulAndStoreInDb();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getFromContentfulAndStoreInDb() {
    await this.contentfulApiService.FetchDataFromContentful();
  }
}
