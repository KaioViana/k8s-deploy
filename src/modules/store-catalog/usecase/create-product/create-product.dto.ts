interface ICreateProductInputDto {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
}

interface ICreateProductOutputDto extends ICreateProductInputDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export { ICreateProductInputDto, ICreateProductOutputDto };
