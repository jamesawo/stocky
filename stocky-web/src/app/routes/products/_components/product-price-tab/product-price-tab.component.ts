import {Component} from '@angular/core';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';

@Component({
    selector: 'app-product-price-tab',
    templateUrl: './product-price-tab.component.html',
    styles: [],
})
export class ProductPriceTabComponent {
    public popover = PRODUCT_CREATE_POPOVER;
}
