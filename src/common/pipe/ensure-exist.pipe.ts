import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class EnsureExistPipe implements PipeTransform {
  constructor(
    private readonly service,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('EnsureExistPipe', value, metadata);

    const id = value;

    return value;
  }
}
