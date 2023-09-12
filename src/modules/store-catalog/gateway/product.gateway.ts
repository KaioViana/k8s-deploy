import { Product } from "../domain/product.entity";

interface IProductGateway {
  create(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}

export { IProductGateway };
