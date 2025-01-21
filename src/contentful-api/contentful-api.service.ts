import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { contentfulItem } from './contentful-api.types';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class ContentfulApiService {
    baseUrl = ""
    constructor(
        private configService: ConfigService,
        private productsService: ProductsService
    ) {
        const space_id = this.configService.get<string>("CONTENTFUL_SPACE_ID")
        const access_token = this.configService.get<string>("CONTENTFUL_ACCESS_TOKEN")
        const contentful_environment = this.configService.get<string>("CONTENTFUL_ENVIRONMENT")
        const content_type = this.configService.get<string>("CONTENTFUL_CONTENT_TYPE")
        this.baseUrl = `https://cdn.contentful.com/spaces/${space_id}/environments/${contentful_environment}/entries?access_token=${access_token}&content_type=${content_type}`
    }

    async FetchDataFromContentful() {
        const response = await fetch(this.baseUrl)
        const resolveRespone: contentfulItem[] = (await response.json())["items"]     
        const productEntities = resolveRespone.map((item) => {
            const newProductDto: CreateProductDto = {
                ...item.fields,
                locale: item.sys.locale,
                createdAt: new Date(item.sys.createdAt),
                updatedAt: new Date(item.sys.updatedAt),
            } 
            this.productsService.createOrUpdate(newProductDto)
        })
    }

}
