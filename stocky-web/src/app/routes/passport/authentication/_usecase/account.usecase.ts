import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../../data/payload/common.interface';
import {EmployeeSearchPayload} from '../../../company/_data/company.payload';
import {AccountPayload} from '../_data/account.payload';


@Injectable({
    providedIn: 'root'
})
export class AccountUsecase {
    private url: string = environment.api.baseUrl + '/auth/account';

    constructor(private http: HttpClient) {}

    public search(payload: PageSearchPayload<EmployeeSearchPayload>) {
        return this.http.post<PageResultPayload<AccountPayload>>(`${this.url}/search`, payload, {observe: 'response'});
    }

    public updateExpiryDate(userId: number, newDate: string) {
        return this.http.put(`${this.url}/update-expiry-date`, {expiryDate: newDate}, {observe: 'response'});
    }
}
