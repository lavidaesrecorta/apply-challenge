import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { contentfulItem } from './contentful-api.types';


@Injectable()
export class ContentfulApiService {
    baseUrl = ""
    constructor(private configService: ConfigService) {
        const space_id = this.configService.get<string>("CONTENTFUL_SPACE_ID")
        const access_token = this.configService.get<string>("CONTENTFUL_ACCESS_TOKEN")
        const contentful_environment = this.configService.get<string>("CONTENTFUL_ENVIRONMENT")
        const content_type = this.configService.get<string>("CONTENTFUL_CONTENT_TYPE")
        this.baseUrl = `https://cdn.contentful.com/spaces/${space_id}/environments/${contentful_environment}/entries?access_token=${access_token}&content_type=${content_type}`
    }

    async testService() {
        const response = await fetch(this.baseUrl)
        const resolveRespone: contentfulItem[] = (await response.json())["items"]
        console.log(resolveRespone);
    }

}
