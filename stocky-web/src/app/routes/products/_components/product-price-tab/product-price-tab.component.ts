import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';

@Component({
    selector: 'app-product-price-tab',
    templateUrl: './product-price-tab.component.html',
    styles: [],
})
export class ProductPriceTabComponent {
    public popover = PRODUCT_CREATE_POPOVER;

    @Input()
    public formGroup?: FormGroup;

    public getForm() {
        return this.formGroup!.get('price') as FormGroup;
    }



}
