import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ExpensesPayload} from '../../_data/company.payload';

@Injectable({providedIn: 'root'})
export class ExpensesUsecase {
    private url = environment.api.baseUrl + '/company/expenses';

    constructor(private http: HttpClient) {}

    public save(payload: ExpensesPayload) {
        return this.http.post<ExpensesPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public getAll() {
        return this.http.get<ExpensesPayload[]>(`${this.url}/all`);
    }

    public remove(id: number) {
        return this.http.delete(`${this.url}/remove/${id}`, {observe: 'response'});
    }

    public update(payload: ExpensesPayload) {
        return this.http.put<ExpensesPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }


}
