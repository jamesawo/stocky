import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';
import {isFormControlInvalid} from '../../../../shared/utils/util';

@Component({
    selector: 'app-product-basic-tab',
    templateUrl: './product-basic-tab.component.html',
    styles: [
        `
            ::ng-deep .ng-tns-c18-16.ant-form-item-explain-error {
                margin-bottom: 5px;
            }
        `
    ],
})
export class ProductBasicTabComponent {
    public popover = PRODUCT_CREATE_POPOVER;

    @Input()
    public formGroup?: FormGroup;
    protected readonly isFormControlInvalid = isFormControlInvalid;

    public isControlValid(controlName: string): any {
        const control = this.formGroup!.get(controlName);
        return control && control.invalid && control.dirty ? 'error' : 'success';
    }
}
