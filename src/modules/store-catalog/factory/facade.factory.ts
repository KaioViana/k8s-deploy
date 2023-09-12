import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { IStoreCatalogFacade } from "../facade/store-catalog.facade.interface"
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { ProductRepository } from "../repository/product.repository"
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase"
import { Product } from "../domain/product.entity";
import { DatabaseConnection } from '../infra/database/sequelize/database.connection';
import { CreateProductUseCase } from "../usecase/create-product/create-product.usecase";

class FacadeFactory {
  static create(): IStoreCatalogFacade {
    DatabaseConnection.getConnectionInstance().sync();
    const databaseContext = new DatabaseContext();
    const productRepository = new ProductRepository(databaseContext);
    const findProductUsecase = new FindProductUseCase(productRepository);
    const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
    const createProductUsecase = new CreateProductUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(
      findProductUsecase,
      findAllProductUsecase,
      createProductUsecase,
    );

    return storeCatalogFacade;
  }
  static createMock(): IStoreCatalogFacade {
    const inMemory = new InMemoryDatabaseContext<Product>();
    const productRepository = new ProductRepository(inMemory);
    const findProductUsecase = new FindProductUseCase(productRepository);
    const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(
      findProductUsecase,
      findAllProductUsecase,
      createProductUseCase,
    );

    return storeCatalogFacade;
  }
}

export { FacadeFactory }
