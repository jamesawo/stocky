import {formatCurrency} from '@angular/common';
import {HttpResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {first, firstValueFrom, from, map, Observable, switchMap} from 'rxjs';
import {EditCacheMap} from '../components/update-delete-action/update-delete-action.component';

export function isFormInvalid(form: FormGroup): boolean {
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

export function markFormFieldsAsDirtyAndTouched(form: FormGroup): void {
    if (form && form.controls) {
        Object.values(form.controls).forEach((control, index) => {
            if (control instanceof FormControl) {
                const currentControl = control as FormControl;
                currentControl.markAsDirty();
                currentControl.updateValueAndValidity();
            } else if (control instanceof FormGroup) {
                const currentGroup = control as FormGroup;
                currentGroup.markAllAsTouched();
                currentGroup.markAsDirty();
                markFormFieldsAsDirtyAndTouched(currentGroup);
            }
        });
        return;
    }
    return;
}

export function isFormControlInvalid(controlName: string, form: FormGroup): boolean {
    if (form && form.controls) {
        if (form.controls[controlName]) {
            return form.controls[controlName].invalid;
        }
        return true;
    }
    return true;
}

export function currencyFormatter(value?: number): string {
    if (value) {
        return formatCurrency(value, 'en-Us', '₦', '₦');
    }
    return '';
}

export function handleCreatePdfResourceUrl(blobFile: ArrayBuffer): string {
    let file = new Blob([blobFile], {type: 'application/pdf'});
    return URL.createObjectURL(file);
}

export function showSuccessNotification(
    service: any,
    content: string = 'Your request was successful',
    title: string = 'Successful'
): void {
    if (service) {
        service.success(title, content);
    }
}

export function showErrorNotification(
    service: NzNotificationService,
    content: string = 'Failed, please try again!',
    title: string = 'There was a problem.'
): void {
    if (service) {
        service.error(title, content);
    }
}

export function handleHttpRequestError(
    erObj: any,
    opts?: {service?: NzNotificationService; title?: string},
    errorMessage?: string,
    errorList?: string[]
): void {
    errorMessage = erObj?.error?.message ?? 'There was a problem.';
    errorList = erObj?.error?.error ?? [];

    if (opts && opts.service) {
        let title = opts.title ?? errorMessage;
        let message = '';

        if (errorList instanceof Array) {
            errorList?.forEach((value) => {
                message += `${value} <br>`;
            });
        } else {
            errorList = ['ACTION FAILED'];
            if (erObj.error.error && erObj.status) {
                message += `${erObj.status}: ${erObj.error.path ?? ''} ${erObj.error.error} <br>`;
                errorList.push(message);
                errorList.push(erObj.message ?? '');
            }
        }

        if (erObj?.status != null) {
            title += ` :${erObj.status}`;
        }

        showErrorNotification(opts.service, message, title);
    }
}

export async function handleHttpResponse<T>(
    response: T,
    nzNotificationService: NzNotificationService,
    opts?: {success?: string}
): Promise<T> {
    try {
        const value: any = await response;
        if (value && value.ok) {
            showSuccessNotification(nzNotificationService, opts?.success);
        } else {
            showErrorNotification(nzNotificationService);
        }
        return value;
    } catch (error: any) {
        handleHttpRequestError(error, {service: nzNotificationService});
        return response;
    }
}

export async function handleUsecaseRequest<T>(
    arg: Observable<T>,
    notificationService: NzNotificationService,
    message?: {success: string; error: string}
): Promise<T> {
    try {
        const value: any = await firstValueFrom(arg);
        if (value && value.ok) {
            showSuccessNotification(notificationService, message?.success);
        } else {
            showErrorNotification(notificationService, message?.error);
        }
        return value;
    } catch (e: any) {
        handleHttpRequestError(e, {service: notificationService});
        const res: any = undefined;
        return Promise.resolve(res);
    }
}

export function handleAppendToObservableListIfResponse<T>(
    source: Observable<T[]>,
    item: HttpResponse<T>
): Observable<T[]> | undefined {
    if (item && item.ok && item.body) {
        return from(source!.pipe(map((list) => [...list, {...item.body!}])));
    }
    return source;
}

export function handleUpdateObservableListIfResponse<T>(
    source: Observable<T[]>,
    response: HttpResponse<T>
): Observable<T[]> {
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

export function handleFindFromObservableList<T>(
    source: Observable<T[]>,
    opts: {key: string; value: number}
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

export function handleRemoveFromObservableListIfStatus<T>(
    source: Observable<T[]>,
    opts: {key: string; value: number},
    response: HttpResponse<any>
): Observable<T[]> {
    if (response.ok && response.body === true) {
        return source.pipe(map((list: T[]) => list.filter((item: any) => item[opts.key] !== opts.value)));
    }
    return source;
}

export async function handleCancelEditingTableItem<T extends {id: any}>(
    item: T,
    list: Observable<T[]>,
    editMap: EditCacheMap<T>
) {
    if (item) {
        let payload = await handleFindFromObservableList(list, {key: 'id', value: item.id});
        editMap[item.id] = {
            data: {...payload},
            edit: false,
            updating: false,
            deleting: false
        };
        return editMap;
    }
    return editMap;
}


export function getFormGroupFromParent(mainForm: FormGroup, childFormName: string): FormGroup<any> {
    return mainForm.get(childFormName) as FormGroup;
}

export function getFormControlValidityStatus(formGroup: FormGroup, controlName: string): any {
    const control = formGroup.get(controlName);
    return control && control.invalid && control.dirty ? 'error' : 'success';
}
