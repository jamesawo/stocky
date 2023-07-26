import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonPayload} from '../../../../data/payload/common.payload';
import {PaymentOptionUsecase} from '../../../company/_usecase/payment-option.usecase';
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

    public products = Array(2);

    public paymentOptions$?: Observable<CommonPayload[]>;
    public paymentOption?: CommonPayload;

    constructor(
        private cartUsecase: SaleCartUsecase,
        private paymentUsecase: PaymentOptionUsecase
    ) {}


    public ngOnInit(): void {
        // this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
        this.paymentOptions$ = this.paymentUsecase.getAll();
    }

    public isSelected(option: CommonPayload) {
        return this.paymentOption?.id === option.id;
    }
}
