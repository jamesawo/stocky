import {Component, OnInit} from '@angular/core';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-buttons',
    templateUrl: './sale-cart-buttons.component.html',
    styleUrls: ['./sale-cart-buttons.component.css']
})
export class SaleCartButtonsComponent implements OnInit {

    public isLoadingPayment = false;
    public isSavingOrder = false;
    public cart?: SaleCart;

    constructor(private cartUsecase: SaleCartUsecase) {}


    public ngOnInit(): void {
        this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
    }

    public handlePayButton = (arg?: any) => {};

    public handleClearButton = (arg?: any) => {
        this.cart?.emptyCart();
    };

    public handleSaveButton = (arg?: any) => {

    };

    public emptyAction() {

    }
}
