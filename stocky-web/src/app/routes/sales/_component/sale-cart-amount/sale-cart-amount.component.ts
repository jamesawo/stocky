import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-amount',
    templateUrl: './sale-cart-amount.component.html',
    styles: [
        `
          .cart-amount-wrapper {
            display: flex;
            flex-direction: column;
            line-height: 30px;
            padding-left: 20px;
            padding-right: 20px;
            font-size: 15px;
            font-weight: 400;
          }

          .cart-amount {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .grand-total {
            font-weight: 900;
            font-size: 19px;
          }

          /* Media query for medium screens (e.g., tablets) */
          @media screen and (min-width: 40em) and (max-width: 52em) {
            .grand-total {
              font-weight: 900;
              font-size: 17px;
            }
          }

          /* Media query for small screens (e.g., phones) */
          @media screen and (max-width: 640px) {
            .grand-total {
              font-weight: 900;
              font-size: 17px;
            }
          }

        `
    ]
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
