import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-summary',
    templateUrl: './sale-cart-summary.component.html',
    styles: []
})
export class SaleCartSummaryComponent implements OnInit, OnDestroy {

    public cart?: SaleCart;
    private subs = new Subscription();

    constructor(private cartUsecase: SaleCartUsecase) {}

    public ngOnInit(): void {
        this.subs.add(
            this.cartUsecase.cart$.subscribe(cart => this.cart = cart)
        );
    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
