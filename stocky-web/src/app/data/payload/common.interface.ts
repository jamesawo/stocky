import {PagePayload} from './common.payload';

export interface IDateRange {
    startDate: string;
    endDate: string;
}

export interface PageSearchPayload<T> {
    page?: PagePayload;
    searchRequest?: T;
}

export interface PageResultPayload<T> {
    page?: PagePayload;
    result?: T[];
}

