import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-amount',
    templateUrl: './sale-cart-amount.component.html',
    styleUrls: ['./sale-cart-amount.component.css']
})
export class SaleCartAmountComponent implements OnInit, OnDestroy {
    public cart: SaleCart = new SaleCart();
    private sub = new Subscription();

    constructor(private usecase: SaleCartUsecase) {}

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    public ngOnInit(): void {
        this.sub.add(
            this.usecase.cart$.subscribe(cart => this.cart = cart)
        );
    }

}
