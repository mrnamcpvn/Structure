export interface Pagination {
  currentPage?: number;
  itemsPerPage?: number,
  totalItems?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  skip?: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
