export interface Pagination {
    currentPage: number;
    totalPage: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResult<T> {
    result: T[];
    pagination: Pagination;
}