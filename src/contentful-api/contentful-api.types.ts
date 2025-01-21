export interface contentfulItemMetadata {
  tags: any[];
  concepts: any[];
}

export interface contentfulItemSys {
  space: { sys: object };
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: { sys: object };
  publishedVersion: number;
  revision: number;
  contentType: { sys: object };
  locale: string;
}

export interface contentfulProductFields {
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
