export interface contentfulItemMetadata {
    tags: any[]
    concepts: any[]
}

export interface contentfulItemSys {
    space: { sys: Object };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: { sys: Object };
    publishedVersion: number;
    revision: number;
    contentType: { sys: Object };
    locale: string
}

export interface contentfulProductFields{
    sku: string;
    name: string;
    brand: string;
    model: string;
    category: string;
    color: string;
    price: number;
    currency: string;
    stock: number;
}

export interface contentfulItem {
    metadata: contentfulItemMetadata;
    sys: contentfulItemSys;
    fields: contentfulProductFields;
}
