import {UrlTree} from '@angular/router';
import {NzUploadType} from 'ng-zorro-antd/upload';
import {Observable} from 'rxjs';
import {UploadFnProps} from '../../shared/components/upload-file/upload-file.component';
import {FileType} from './common.enum';
import {PagePayload} from './common.payload';
import {CustomerPayload} from "../../routes/company/_data/company.payload";
import {CustomerSaveLocationEnum} from "../../routes/company/_data/company.enum";

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


export interface UploadComponentInput {
    canUploadMultipleFiles: boolean;
    canDownloadTemplate: boolean;
    onDownloadTemplate: () => void;
    onUploadTemplate?: (arg: UploadFnProps) => void;
    url?: string;
    type: NzUploadType;
    allowedFileTypes: FileType[];
    maxFileSizeInMB: number;
}

export interface CustomerNotifier {
    customer?: CustomerPayload;
    from?: CustomerSaveLocationEnum;
}
