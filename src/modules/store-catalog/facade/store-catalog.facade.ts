import { CreateProductUseCase } from "../usecase/create-product/create-product.usecase";
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";
import { CreateStoreCatalogFacadeInputDto, CreateStoreCatalogFacadeOutputDto, FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.dto";
import { IStoreCatalogFacade } from "./store-catalog.facade.interface";

class StoreCatalogFacade implements IStoreCatalogFacade {
  constructor(
    private readonly findProductUsecase: FindProductUseCase,
    private readonly findAllProductUsecase: FindAllProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase
  ) { }

  async create(input: CreateStoreCatalogFacadeInputDto): Promise<CreateStoreCatalogFacadeOutputDto> {
    return this.createProductUseCase.execute(input);
  }

  async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this.findProductUsecase.execute(input);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this.findAllProductUsecase.execute();
  }
}

export { StoreCatalogFacade };
