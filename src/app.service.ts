import { Injectable } from '@nestjs/common';
import { ContentfulApiService } from './contentful-api/contentful-api.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
