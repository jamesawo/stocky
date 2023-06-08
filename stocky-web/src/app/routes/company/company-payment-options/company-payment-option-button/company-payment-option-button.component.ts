import {Component, Input} from '@angular/core';
import {CommonInputProps} from '../../../../data/payload/common.types';

@Component({
    selector: 'app-company-payment-option-button',
    templateUrl: './company-payment-option-button.component.html',
    styles: []
})
export class CompanyPaymentOptionButtonComponent {

    @Input()
    public props: CommonInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

    public isVisible = false;

    public showModal = () => (this.isVisible = true);

}
