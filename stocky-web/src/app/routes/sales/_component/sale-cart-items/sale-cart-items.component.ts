import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {getProductName} from '../../../../shared/utils/util';
import {ProductPayload} from '../../../products/_data/product.payload';
import {SaleCart, SaleCartItem} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-items',
    templateUrl: './sale-cart-items.component.html',
    styles: [
        `
          .cart-items {
            max-height: 250px;
            overflow-y: scroll;
          }

          .item-wrapper {
            border-style: solid;
            border-width: 0.5px;
            border-color: lightgray;
          }

          .item-control {
            align-self: baseline;
            text-align: end;
            max-width: 150px;
            width: max-content;
          }

          .item-quantity {
            min-width: 70px;
            max-width: 100px;
            width: 73px;
          }
        `
    ]
})
export class SaleCartItemsComponent implements OnInit, OnDestroy {

    public cart?: SaleCart;
    private sub = new Subscription();

    constructor(private cartUsecase: SaleCartUsecase) {}

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public ngOnInit(): void {
        this.sub.add(
            this.cartUsecase.cart$.subscribe(cart => this.cart = cart)
        );
    }

    public concatProductName(product: ProductPayload) {
        return getProductName(product);
    }

    public increment(arg: {cart: SaleCart, item: SaleCartItem,}) {
        if (arg && arg.cart && arg.item) {
            arg.item.increment();
            arg.cart.updateAmount();
        }
    }

    public decrement(arg: {cart: SaleCart, item: SaleCartItem}) {
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
