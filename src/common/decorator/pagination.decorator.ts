import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

const PER_PAGE_LIMIT_DEFAULT = 10;
const PER_PAGE_LIMIT_MAX = 100;
const PER_PAGE_LIMIT_MIN = 1;

export class PaginationOptions {
  @ApiModelPropertyOptional() public readonly limit: number;
  @ApiModelPropertyOptional() public readonly page: number;
}

export const Pagination = createParamDecorator((_: string, req: Request): PaginationOptions => {
  req.query.limit = (typeof req.query.limit === 'number') ?
    req.query.limit :
    parseInt(req.query.limit, 10) || PER_PAGE_LIMIT_DEFAULT;

  req.query.page = (typeof req.query.page === 'number') ?
    req.query.page :
    parseInt(req.query.page, 10) || 1;

  if (req.query.limit > PER_PAGE_LIMIT_MAX) {
    req.query.limit = PER_PAGE_LIMIT_MAX;
  } else if (req.query.limit < PER_PAGE_LIMIT_MIN) {
    req.query.limit = PER_PAGE_LIMIT_MIN;
  }

  const limit: number = req.query.limit;
  const page: number = req.query.page;

  return {
    limit,
    page,
  };
});
