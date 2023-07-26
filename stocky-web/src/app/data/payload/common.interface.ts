import {UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
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


export type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export interface CanComponentDeactivate {
    canDeactivate: () => CanDeactivateType;
}
