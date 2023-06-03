import {Component, Input} from '@angular/core';
import {NzButtonSize} from 'ng-zorro-antd/button';

export type TaxInputProps = {
    size?: NzButtonSize,
    title?: string,
    icon?: string,
    showTable: boolean,
    showForm: boolean,
}

@Component({
    selector: 'app-product-tax-add-btn',
    templateUrl: './product-tax-add-btn.component.html',
    styles: []
})
export class ProductTaxAddBtnComponent {
    @Input()
    public props: TaxInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

    public isVisible = false;

    public showModal = () => (this.isVisible = true);
}
