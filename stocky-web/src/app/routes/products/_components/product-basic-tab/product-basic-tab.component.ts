import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';
import {ProductStatusPayload} from '../../_data/product.payload';
import {UnitOfMeasurePayload} from '../../_data/unit-of-measure.payload';

@Component({
    selector: 'app-product-basic-tab',
    templateUrl: './product-basic-tab.component.html',
    styles: [],
})
export class ProductBasicTabComponent {
    public popover = PRODUCT_CREATE_POPOVER;
    public statusList: Observable<ProductStatusPayload[]> = of([]);

    public onUnitOfMeasureSelected(payload?: UnitOfMeasurePayload) {
        console.log(payload);
    }

    public onProductStatusSelected(payload: ProductStatusPayload) {
        console.log(payload);
    }
}
