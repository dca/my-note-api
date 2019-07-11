import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  //
  constructor() {
    super();
  }

  public async ensureExist(id: number): Promise<T> {
    const record = await this.findOne(id);
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }
}
