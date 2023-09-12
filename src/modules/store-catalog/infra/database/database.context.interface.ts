interface IDatabaseContext<T> {
  create(input: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

export { IDatabaseContext };
