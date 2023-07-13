import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {Stock} from '../_data/stock.payload';

@Injectable({providedIn: 'root'})
export class ManageStockUsecase {
    private url = environment.api.baseUrl + '/stock';

    constructor(private http: HttpClient) {}

    public save(payload: Stock) {
        return this.http.post<Stock>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<any>) {
        return this.http.post<PageResultPayload<any>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }


}
