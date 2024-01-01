import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SaleCartNotifyType} from '../_data/sale-cart.enum';
import {SaleCart} from '../_data/sale-cart.payload';

@Injectable({
    providedIn: 'root'
})
export class SaleCartUsecase {
    public cart: BehaviorSubject<SaleCart>;
    public cart$: Observable<SaleCart>;
    public notifyType: BehaviorSubject<SaleCartNotifyType>;
    public notifyType$: Observable<SaleCartNotifyType>;

    constructor(private http: HttpClient) {

        this.cart = new BehaviorSubject(new SaleCart());
        this.cart$ = this.cart.asObservable();

        this.notifyType = new BehaviorSubject<SaleCartNotifyType>(SaleCartNotifyType.NONE);
        this.notifyType$ = this.notifyType.asObservable();

    }

    public setNotifyType(value: SaleCartNotifyType) {
        this.notifyType.next(value);
    }

}
