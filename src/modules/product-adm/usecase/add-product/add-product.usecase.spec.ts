import { StoreCatalogFacade } from "../../../store-catalog/facade/store-catalog.facade";
import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

const MockStoreCatalogFacade = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Add Product usecase unit test", () => {
  it("should add a product", async () => {
    const storeCatalogFacade = MockStoreCatalogFacade()
    const productRepository = MockRepository();
    const usecase = new AddProductUseCase(
      productRepository,
      storeCatalogFacade,
    );

    const input = {
      name: "Product1",
      description: "description",
      purchasePrice: 100,
      stock: 10,
    };

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalledTimes(1);
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.purchasePrice).toBeDefined();
    expect(result.stock).toBeDefined();
  });
});
