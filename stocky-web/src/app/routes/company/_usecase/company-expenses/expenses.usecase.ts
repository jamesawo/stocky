import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../../data/payload/common.interface';
import {ExpensesPayload, ExpensesSearchPayload} from '../../_data/company.payload';

@Injectable({providedIn: 'root'})
export class ExpensesUsecase {
    private url = environment.api.baseUrl + '/company/expenses';

    constructor(private http: HttpClient) {}

    public save(payload: ExpensesPayload) {
        return this.http.post<ExpensesPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<ExpensesSearchPayload>) {
        return this.http.post<PageResultPayload<ExpensesPayload>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }


}
