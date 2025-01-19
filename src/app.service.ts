import { Injectable } from '@nestjs/common';
import { ContentfulApiService } from './contentful-api/contentful-api.service';

@Injectable()
export class AppService {
  
    constructor(private contentfulApi: ContentfulApiService) {}
  
  getHello(): string {
    return 'Hello World!';
  }
}
