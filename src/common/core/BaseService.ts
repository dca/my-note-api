import { BaseEntity, FindConditions } from 'typeorm';

import { BaseRepository } from './BaseRepository';

export abstract class BaseService<E extends BaseEntity, R extends BaseRepository<E>> {
  protected abstract repository: R;

  /**
   * create entity
   */
  public async create(data: object): Promise<E> {
    const record: E = this.repository.create(data);
    return record.save();
  }

  public async findAll(): Promise<E[]> {
    return this.find();
  }

  public async find(conditions?: FindConditions<E>): Promise<E[]> {
    return this.repository.find(conditions);
  }

  public async findOne(id: number): Promise<E> {
    return this.repository.ensureExist(id);
  }

  public async updateOne(record: E, data: any): Promise<E> {
    record = this.repository.merge(record, { ...data });
    return record.save();
  }

  public async update(id: number, data: any): Promise<E> {
    // console.log('update', id, data);
    const record = await this.findOne(id);
    return this.updateOne(record, data);
  }

  // public async trash(id: number): Promise<T> {
  //   const record = await this.findOne(id);
  //   return this.updateOne(record, { trashedAt: new Date() });
  // }
}
