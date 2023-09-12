import { ProductAdmFacade } from "../facade/product-adm.facade";
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { DatabaseConnection } from "../infra/database/sequelize/database.connection";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";
import { Product } from "../domain/product.entity";
import { FacadeFactory as StoreCatalogFacadeFactory } from '../../store-catalog/factory/facade.factory';

class ProductAdmFacadeFactory {
  static create() {
    DatabaseConnection.getConnectionInstance().sync();
    const sequelize = new DatabaseContext();
    const productRepository = new ProductRepository(sequelize);
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const addProductUsecase = new AddProductUseCase(
      productRepository,
      storeCatalogFacade,
    );
    const checkStockUsecase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade(
      addProductUsecase,
      checkStockUsecase,
    );

    return productFacade;
  }

  static createMock() {
    const inMemory = new InMemoryDatabaseContext<Product>
    const productRepository = new ProductRepository(inMemory);
    const storeCatalogFacade = StoreCatalogFacadeFactory.createMock();
    const addProductUsecase = new AddProductUseCase(
      productRepository,
      storeCatalogFacade
    );
    const checkStockUsecase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade(
      addProductUsecase,
      checkStockUsecase,
    );

    return productFacade;
  }
}

export { ProductAdmFacadeFactory };
