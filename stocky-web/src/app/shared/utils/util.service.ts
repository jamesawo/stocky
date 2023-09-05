import {DatePipe, formatCurrency} from '@angular/common';
import {HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import Rollbar from 'rollbar';

import {first, firstValueFrom, from, map, Observable, switchMap, throwError} from 'rxjs';
import {FileMimeType, FileTemplate, FileType, ModalOrDrawer} from '../../data/payload/common.enum';
import {TableEditCacheMap} from '../../data/payload/common.types';
import {PassportUsecase} from '../../routes/passport/authentication/_usecase/passport.usecase';
import {ProductPayload, ProductTaxPayload} from '../../routes/products/_data/product.payload';
import {ResponsiveService} from './responsive.service';
import {RollbarService} from './rollbar.service';


@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        @Inject(RollbarService) private rollbar: Rollbar,
        private passport: PassportUsecase,
        private responsive: ResponsiveService
    ) {
    }


    public static calculatePercentage(percent: number, price: number) {
        return Math.round(Number(price) * Number((percent) / 100));
    }

    public static calculateSellingPrice(costPrice: number = 0, markupPercent: number = 0) {
        const markupAmount = UtilService.calculatePercentage(markupPercent, costPrice);
        return Number(costPrice) + Number(markupAmount);
    }

    public calculateDrawerWidth(): number {
        let screenWidth = this.responsive.screenWidth$.value;
        if (screenWidth && screenWidth < 700) {
            return 300;
        } else {
            return 720;
        }
    }

    public isFormInvalid(form: FormGroup): boolean {
        if (form && form.controls) {
            let invalid = form.invalid;
            if (invalid) {
                Object.keys(form.controls).forEach((key) => {
                    if (key) {
                        form.get(`${key}`)?.markAsDirty();
                        form.get(`${key}`)?.updateValueAndValidity();
                    }
                });
            }
            return invalid;
        }
        return false;
    }

    public markFormFieldsAsDirtyAndTouched(form: FormGroup): void {
        if (form && form.controls) {
            form.markAsTouched();
            form.markAsDirty();
            Object.values(form.controls).forEach((control, index) => {
                if (control instanceof FormControl) {
                    const currentControl = control as FormControl;
                    currentControl.markAsDirty();
                    currentControl.updateValueAndValidity();
                } else if (control instanceof FormGroup) {
                    const currentGroup = control as FormGroup;
                    currentGroup.markAllAsTouched();
                    currentGroup.markAsDirty();
                    this.markFormFieldsAsDirtyAndTouched(currentGroup);
                }
            });
            return;
        }
        return;
    }

    public isFormControlInvalid(controlName: string, form: FormGroup): boolean {
        if (form && form.controls && form.touched && form.dirty) {
            return form.controls[controlName].invalid;
        }
        return false;
    }

    public getNzFormControlValidStatus(controlName: string, form: FormGroup) {
        if (form && form.touched && form.dirty) {
            return form.controls[controlName].invalid ? 'error' : 'success';
        }
        return '';
    }

    public currencyFormatter(value?: number): string {
        if (value) {
            return formatCurrency(value, 'en-Us', '₦', '₦');
        }
        return '';
    }

    public handleCreateFileResourceUrl(blobFile: ArrayBuffer | Blob, type: string): string {
        let file = new Blob([blobFile], {type: type});
        return URL.createObjectURL(file);
    }

    public handleFileDownload(fileUrl: string, fileName: string): void {
        let anchorElement = document.createElement('a');
        document.body.appendChild(anchorElement);
        anchorElement.setAttribute('style', 'display: none');
        anchorElement.href = fileUrl;
        anchorElement.download = fileName;
        anchorElement.click();
        window.URL.revokeObjectURL(fileUrl);
        anchorElement.remove();
    }

    public handleDownloadTemplate(blob: Blob, type: FileType, template: FileTemplate): void {
        const url = this.handleCreateFileResourceUrl(blob, this.getFileMimeType(type));
        this.handleFileDownload(url, template);
    }

    public getFileMimeType(type: FileType): string {
        switch (type) {
            case FileType.PDF:
                return FileMimeType.PDF;
            case FileType.EXCEL:
                return FileMimeType.EXCEL;
            case FileType.CSV:
                return FileMimeType.CSV;
            case FileType.TXT:
                return FileMimeType.TXT;
            case FileType.WORD:
                return FileMimeType.WORD;
            case FileType.DOCX:
                return FileMimeType.DOCX;
            case FileType.JPG:
                return FileMimeType.JPG;
            case FileType.PNG:
                return FileMimeType.PNG;
            default:
                return '';
        }
    }

    public showSuccessNotification(
        service: any, content: string = 'Your request was successful', title: string = 'Successful'
    ): void {
        if (service) {
            service.success(title, content);
        }
    }

    public showErrorNotification(
        service: NzNotificationService | NzMessageService,
        shortMessageOrTitle: string = 'Failed, please try again!',
        longMessage: string = 'There was a problem.',
        duration?: number
    ): void {
        if (service) {
            if (service instanceof NzMessageService) {
                service.error(longMessage, {nzDuration: duration ?? 10000});
            } else {
                service.error(longMessage, shortMessageOrTitle, {nzDuration: duration ?? 10000});
            }
        }
    }

    public handleHttpRequestError(
        erObj: any,
        opts?: {service?: NzNotificationService | NzMessageService; title?: string, duration?: number},
        errorMessage?: string,
        errorList?: string[]
    ) {
        errorMessage = erObj?.error?.message ?? 'There was a problem.';
        errorList = erObj?.error?.error ?? [];

        if (opts && opts.service) {
            let shortMessage = opts.title ?? errorMessage;
            let listMessage = '';

            if (errorList instanceof Array) {
                errorList?.forEach((value) => {
                    listMessage += `${value} <br>`;
                });
            } else {
                errorList = ['ACTION FAILED'];
                if (erObj.error.error && erObj.status) {
                    listMessage += `${erObj.status}: ${erObj.error.path ?? ''} ${erObj.error.error} <br>`;
                    errorList.push(listMessage);
                    errorList.push(erObj.message ?? '');
                }
            }
            this.showErrorNotification(opts.service, listMessage, shortMessage, opts.duration);
        }

        this.reportError(erObj);
        return throwError(errorList ?? errorMessage);
    }

    public async handleUsecaseRequest<T>(
        arg: Observable<T>,
        notificationService: NzMessageService | NzNotificationService,
        message?: {success: string; error: string}
    ): Promise<T> {
        try {
            const value: any = await firstValueFrom(arg, {defaultValue: undefined});
            if (value && value?.ok) {
                this.showSuccessNotification(notificationService, message?.success);
            } else {
                this.showErrorNotification(notificationService, message?.error);
            }
            return value;
        } catch (e: any) {
            this.handleHttpRequestError(e, {service: notificationService});
            const res: any = undefined;
            return Promise.resolve(res);
        }
    }

    public handleAppendToObservableListIfResponse<T>(
        source: Observable<T[]>, item: HttpResponse<T>
    ): Observable<T[]> | undefined {
        if (item && item.ok && item.body) {
            return from(source!.pipe(map((list) => [...list, {...item.body!}])));
        }
        return source;
    }

    public handleUpdateObservableListIfResponse<T>(
        source: Observable<T[]>, response: HttpResponse<T>): Observable<T[]> {
        if (response && response.ok) {
            const update: any = response.body;
            return from(
                source.pipe(
                    map((list) => {
                        const index = list.findIndex((item: any) => item.id === update.id);
                        let element: any = list[index];
                        Object.assign(element, update);
                        return list;
                    })
                )
            );
        }
        return source;
    }

    public async handleFindFromObservableList<T>(
        source: Observable<T[]>, opts: {key: string; value: number}
    ): Promise<T> {
        return firstValueFrom(
            source.pipe(
                switchMap((list: T[]) => {
                    const foundItem = list.find((item: any) => item[opts.key] === opts.value);
                    if (foundItem) {
                        return Promise.resolve(foundItem);
                    } else {
                        return Promise.reject(new Error('Item not found'));
                    }
                }),
                first()
            )
        );
    }

    public handleRemoveFromObservableListIfStatus<T>(
        source: Observable<T[]>, opts: {key: string; value: number}, response: HttpResponse<any>
    ): Observable<T[]> {
        if (response && response.ok && response.body === true) {
            return source.pipe(map((list: T[]) => list.filter((item: any) => item[opts.key] !== opts.value)));
        }
        return source;
    }

    public async handleCancelEditingTableItem<T extends {id: any}>(
        item: T, list: Observable<T[]>, editMap: TableEditCacheMap<T>
    ) {
        if (item) {
            let payload = await this.handleFindFromObservableList(list, {key: 'id', value: item.id});
            editMap[item.id] = {
                data: {...payload},
                edit: false,
                updating: false,
                loading: false
            };
            return editMap;
        }
        return editMap;
    }

    public getFormGroupFromParent(mainForm: FormGroup, childFormName: string): FormGroup<any> {
        return mainForm.get(childFormName) as FormGroup;
    }

    public checkFormControlCharacterLimit(formControl: AbstractControl, limit: number = 50) {
        if (formControl) {
            const description = formControl.value;

            if (description.length > limit) {
                formControl.setValue(description.slice(0, limit));
            }
        }
    }

    public toggleModalOrDrawer(type: ModalOrDrawer, showDrawer: boolean, showModal: boolean) {
        if (type === ModalOrDrawer.DRAWER) {
            showDrawer = !showDrawer;
        } else if (type === ModalOrDrawer.MODAL) {
            showModal = !showModal;
        } else {
            showDrawer = !showDrawer;
            showModal = !showModal;
        }

        return {showDrawer, showModal};
    }

    public getDateString(date?: Date): string {
        const dateParam: Date = date ?? new Date();
        const datePipe: DatePipe = new DatePipe('en-US');
        return datePipe.transform(dateParam, 'YYYY-MM-dd') ?? '';
    }

    public getProductFullName(product: ProductPayload): string {
        const basic = product?.basic;
        return `${basic?.productName ?? ''} - ${basic?.brandName ?? ''}`;
    }

    public getProductName(product: ProductPayload): string {
        const basic = product?.basic;
        return `${basic?.productName ?? ''}`;
    }

    public generateColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public getTaxTitle(tax: ProductTaxPayload) {
        if (tax && tax.title) {
            const title = tax.title!;
            return `${title[0].toUpperCase()}${title.substring(1).toLowerCase()} (${tax.percent}%)`;
        }
        return '-';
    }

    public getFromLocal(key: string) {
        return localStorage.getItem(key);
    }

    public storeInLocal(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    public stringToBoolean(str: string): boolean {
        const lowercaseStr = str.toLowerCase();
        if (lowercaseStr === 'true') {
            return true;
        } else if (lowercaseStr === 'false') {
            return false;
        }
        throw new Error('Invalid string value. Expected \'true\' or \'false\'.');
    }

    public isFileNameAllowed(fileName: string, allowedFiles: string []) {
        let value = false;
        // const allowedFiles = ['.xlsx', '.xls'];
        const regex = /(?:\.([^.]+))?$/;
        const extension = regex.exec(fileName);

        if (undefined !== extension && null !== extension) {
            for (const ext of allowedFiles) {
                if (ext === extension[0]) {
                    value = true;
                }
            }
        }
        return value;
    }

    public isFileExtensionAllowed(fileName: string, allowedFiles: FileType[]): boolean {
        const fileExtension = fileName.split('.').pop()?.toLowerCase(); // Get the lowercase file extension

        if (!fileExtension) {
            return false; // No file extension found
        }

        const allowedExtensions = allowedFiles.map(fileType => fileType.toLowerCase()); // Map allowed file types to lowercase

        return allowedExtensions.includes(fileExtension);
    }

    public isFileSizeAllowed(fileSize: number | undefined, maxAllowedFileSize: number): boolean {
        return fileSize ? fileSize <= maxAllowedFileSize : false;
    }

    public toBytes(n: number) {
        return n * 1024 * 1024; // n MB in bytes
    }

    public reportError(err: any) {
        this.addRollBarAppDetail();
        this.addRollBarPerson();

        this.rollbar.error(err);
    }

    private addRollBarAppDetail() {
        const app = this.passport.getAppDetail();

        let codeVersion = app?.version ?? 'v1.0.0';
        this.rollbar.configure({
            codeVersion: codeVersion,
            code_version: codeVersion,
            version: codeVersion
        });

    }

    private addRollBarPerson() {
        let user = this.passport.getLoggedInUser();
        if (user) {
            this.rollbar.configure({
                payload: {
                    person: {
                        id: `${user.id}`,
                        email: user.email,
                        username: user.username
                    }
                }
            });
        }
    }

}
