import {Component, Input} from '@angular/core';
import {CommonInputProps} from '../../../../../data/payload/common.types';


@Component({
    selector: 'app-product-tax-add-btn',
    templateUrl: './product-tax-add-btn.component.html',
    styles: []
})
export class ProductTaxAddBtnComponent {
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
