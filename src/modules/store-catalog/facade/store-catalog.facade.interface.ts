import {
  CreateStoreCatalogFacadeInputDto,
  CreateStoreCatalogFacadeOutputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.dto"

interface IStoreCatalogFacade {
  create(input: CreateStoreCatalogFacadeInputDto): Promise<CreateStoreCatalogFacadeOutputDto>;
  find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}

export { IStoreCatalogFacade }
