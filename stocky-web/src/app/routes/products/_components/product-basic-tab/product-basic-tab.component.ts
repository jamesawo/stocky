import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';
import {ProductUnitOfMeasurePayload} from '../../_data/product-unit-of-measure.payload';
import {ProductCategoryPayload, ProductStatusPayload} from '../../_data/product.payload';
import {FormProps} from '../../_data/product.types';

@Component({
    selector: 'app-product-basic-tab',
    templateUrl: './product-basic-tab.component.html',
    styles: [],
})
export class ProductBasicTabComponent {

    @Input()
    formGroup?: FormGroup;

    public popover = PRODUCT_CREATE_POPOVER;
    public statusList: Observable<ProductStatusPayload[]> = of([]);


    public onUnitOfMeasureSelected(payload?: ProductUnitOfMeasurePayload) {
        console.log(payload);
    }

    public onProductStatusSelected(payload: ProductStatusPayload) {
        console.log(payload);
    }

    public onProductCategorySelected(category: ProductCategoryPayload) {
        console.log(category);
    }

}
