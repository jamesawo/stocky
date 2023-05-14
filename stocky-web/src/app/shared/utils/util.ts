import {FormGroup} from '@angular/forms';
import {formatCurrency} from '@angular/common';
import {HttpResponse} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd/notification';

export function isValidateFormControls(form: FormGroup): boolean {
    if (form && form.controls) {
        let isFormInvalid = form.invalid;
        if (isFormInvalid) {
            Object.keys(form.controls).forEach((key) => {
                if (key) {
                    form.get(`${key}`)?.markAsDirty();
                    form.get(`${key}`)?.updateValueAndValidity();
                }
            });
        }
        return isFormInvalid;
    }
    return false;
}

export function isFormControlInvalid(
    controlName: string,
    form: FormGroup
): boolean {
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

export function createPdfResourceUrl(blobFile: ArrayBuffer): string {
    let file = new Blob([blobFile], {type: 'application/pdf'});
    return URL.createObjectURL(file);
}

export function showSuccessNotification(
    service: any,
    content: string = 'Your request was successful',
    title: string = 'Successful'
) {
    if (service) {
        service.success(title, content);
    }
}

export function showErrorNotification(
    service: NzNotificationService,
    content: string = 'Failed, please try again!',
    title: string = 'There was a problem.'
) {
    if (service) {
        service.error(title, content);
    }
}

export function displayHttpError(
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
                message += `${erObj.status}: ${erObj.error.path ?? ''} ${
                    erObj.error.error
                } <br>`;
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


export const handleHttpResponse = async (
    response: Promise<HttpResponse<any>>,
    nzNotificationService: NzNotificationService,
    opts?: {success?: string}
): Promise<any> => {
    try {
        const value = await response;

        if (value && value.ok) {
            showSuccessNotification(nzNotificationService, opts?.success);
        } else {
            showErrorNotification(nzNotificationService);
        }

        return value;
    } catch (error: any) {
        displayHttpError(error, {service: nzNotificationService});
    }
};
