import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SaleCart} from '../_data/sale-cart.payload';

@Injectable({
    providedIn: 'root'
})
export class SaleCartUsecase {
    public cart: BehaviorSubject<SaleCart>;
    public cart$: Observable<SaleCart>;

    constructor(
        private http: HttpClient
    ) {

        this.cart = new BehaviorSubject(new SaleCart());
        this.cart$ = this.cart.asObservable();
    }

    /*public addToCart(product: ProductPayload): void {
        let cart = this.cart.value;
        if (!cart.isProductExist(product)) {
            cart.addItem(product);
            this.cart.next(cart);
            // this.msg.info(getProductName(product) + ' Added!');
        } else {
            // this.msg.error(getProductName(product) + ' Already added!');
        }
    }

    public removeFromCart(product: ProductPayload): void {
        const cart = this.cart.value;
        cart.removeItem(product);
        this.cart.next(cart);
    }*/

}
