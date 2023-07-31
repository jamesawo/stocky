import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonPayload} from '../../../../data/payload/common.payload';
import {PaymentOptionUsecase} from '../../../company/_usecase/payment-option.usecase';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-payment-options',
    templateUrl: './sale-cart-payment-options.component.html',
    styles: [
        `
          .p-option {
            padding: 20px;
            background: aqua;
            border: black 2px;
            line-height: 35px;
            font-size: 18px;
            font-weight: 500;
          }
        `
    ]
})
export class SaleCartPaymentOptionsComponent {

    @Input()
    public radioStyle: 'radio' | 'button' = 'radio';

    @Input()
    public showIcon = false;

    public products = Array(2);

    public paymentOptions$?: Observable<CommonPayload[]>;
    public paymentOption?: CommonPayload;
    public cart?: SaleCart;

    constructor(
        private cartUsecase: SaleCartUsecase,
        private paymentUsecase: PaymentOptionUsecase
    ) {}


    public async ngOnInit(): Promise<void> {
        this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
        this.paymentOptions$ = this.paymentUsecase.getAll(true);
    }

    public isSelected(option: CommonPayload) {
        return this.paymentOption?.id === option.id;
    }

    public onSelectPaymentMethod(option: CommonPayload) {
        if (this.cart) {
            this.cart.paymentOption = option;
            this.cartUsecase.cart.next(this.cart);
        }
    }
}
