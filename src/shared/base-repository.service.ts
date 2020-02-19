import { BaseEntity, Repository } from 'typeorm';

export default class BaseRepositoryService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  findById(id: number, options?: object): Promise<Entity> {
    return this.repository.findOne(id, options);
  }

  findAll(options?: object): Promise<Entity[]> {
    return this.repository.find(options);
  }

  findOne(options: object): Promise<Entity> {
    return this.repository.findOne(options);
  }

  getCount(options: object): Promise<number> {
    return this.repository.count(options);
  }

  delete(matcher: object): object {
    return this.repository.delete(matcher);
  }

  update(matcher: number | object, updateData: object): object {
    return this.repository.update(matcher, updateData);
  }
}
