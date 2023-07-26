import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {SaleCart} from '../_data/sale-cart.payload';
import {SaleTransaction} from '../_data/sale-transaction.payload';

@Injectable({
    providedIn: 'root'
})
export class SaleTransactionUsecase {
    private url = environment.api + '/sales/transaction';

    constructor(private http: HttpClient) {}

    public save(transaction: SaleTransaction) {
        return this.http.post<SaleCart>(`${this.url}/create`, transaction, {observe: 'response'});
    }
}
