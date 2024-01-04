import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../../../shared/utils/responsive.service';
import {UtilService} from '../../../../shared/utils/util.service';
import {ProductPayload} from '../../../products/_data/product.payload';
import {SaleCartItem} from '../../_data/sale-cart-item.payload';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-items',
    templateUrl: './sale-cart-items.component.html',
    styleUrls: ['./sale-cart-items.component.css']
})
export class SaleCartItemsComponent implements OnInit, OnDestroy {

    public cart?: SaleCart;
    public limit: number = 5;
    public showToolTip: boolean = false;
    public statsWidth: string = '250px';

    private sub = new Subscription();

    constructor(
        private cartUsecase: SaleCartUsecase,
        private responsive: ResponsiveService,
        private util: UtilService
    ) {
    }


    public calculateDrawerWidth(screenWidth: number): void {

        if (screenWidth && screenWidth < 700) {
            // on mobile view
            this.limit = 50;
            this.showToolTip = false;
            this.statsWidth = 'auto';

        } else {
            this.showToolTip = true;
            this.limit = 100;
            this.statsWidth = '250px';
        }

    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public ngOnInit(): void {
        this.sub.add(
            this.responsive.screenWidth$.subscribe(value => this.calculateDrawerWidth(value))
        );
        this.sub.add(
            this.cartUsecase.cart$.subscribe(cart => this.cart = cart)
        );
    }

    public concatProductName(product: ProductPayload) {
        return this.util.getProductFullName(product);
    }

    public increment(arg: { cart: SaleCart, item: SaleCartItem, }) {
        if (arg && arg.cart && arg.item) {
            arg.item.increment();
            arg.cart.updateAmount();
        }
    }

    public decrement(arg: { cart: SaleCart, item: SaleCartItem }) {
        if (arg && arg.cart && arg.item) {
            arg.item.decrement();
            arg.cart.updateAmount();
        }
    }

    public onQuantityChange(ev: any, item: SaleCartItem, cart?: SaleCart) {
        const value = ev.target.value;
        if (value && value > 0) {
            item.updateQuantity(Number(value));
            cart?.updateAmount();
        } else {
            ev.target.value = 1;
        }
    }

}
