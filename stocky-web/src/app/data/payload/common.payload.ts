export class CommonPayload {
    id?: number;
    title?: string;
    description?: string;
}

export class PagePayload {
    pageNumber: number = 1;
    pageSize: number = 10;
    totalPages?: number;
    totalElements?: number;
}
