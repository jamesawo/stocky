import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {SaleTransaction} from '../_data/sale-transaction.payload';

@Injectable({
    providedIn: 'root'
})
export class SaleTransactionUsecase {
    private url = environment.api.baseUrl + '/sales/transaction';

    constructor(private http: HttpClient) {}

    public save(transaction: SaleTransaction) {
        return this.http.post<SaleTransaction>(`${this.url}/create`, transaction, {observe: 'response'});
    }
}
