export class CommonPayload {
    id?: number;
    title?: string;
    description?: string;
    isActiveStatus?: boolean;
}

export class PagePayload {
    pageNumber: number = 1;
    pageSize: number = 10;
    totalPages?: number;
    totalElements?: number;
}
