import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-sale-cart-pay-button',
    templateUrl: './sale-cart-pay-button.component.html',
    styles: []
})
export class SaleCartPayButtonComponent {
    @Input()
    public action: (args?: any) => void = (args?: any) => {};
}
