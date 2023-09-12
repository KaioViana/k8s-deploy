import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway";
import { ICreateProductInputDto, ICreateProductOutputDto } from "./create-product.dto";

class CreateProductUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductGateway,
  ) { }

  async execute(input: ICreateProductInputDto): Promise<ICreateProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      salesPrice: input.salesPrice,
    }

    const product = new Product(props);

    await this.productRepository.create(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}

export { CreateProductUseCase };
