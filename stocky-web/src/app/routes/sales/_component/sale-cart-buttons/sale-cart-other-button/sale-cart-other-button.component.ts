import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-sale-cart-other-button',
    templateUrl: './sale-cart-other-button.component.html',
    styles: []
})
export class SaleCartOtherButtonComponent {

    @Input()
    public buttonClass = '';

    @Input()
    public args?: any = {};

    @Input()
    public icon = '';

    @Input()
    public buttonText = '';

    @Input()
    public cancelText = '';

    @Input()
    public nzOkText = '';

    @Input()
    public nzConfirmTitle = '';

    @Input()
    public action: (arg?: any) => void = () => {};

    public emptyAction = () => {};


}
