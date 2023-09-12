interface CreateStoreCatalogFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
}

interface CreateStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FindStoreCatalogFacadeInputDto {
  id: string;
}

interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[]
}

export {
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
  FindAllStoreCatalogFacadeOutputDto,
  CreateStoreCatalogFacadeInputDto,
  CreateStoreCatalogFacadeOutputDto,
};
