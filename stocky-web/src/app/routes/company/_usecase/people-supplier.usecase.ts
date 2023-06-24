import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {SupplierPayload, SupplierSearchPayload} from '../_data/company.payload';

@Injectable({providedIn: 'root'})
export class PeopleSupplierUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/company/supplier';

    constructor(private http: HttpClient) {}

    public save(payload: SupplierPayload) {
        return this.http.post<SupplierPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }


    public update(payload: SupplierPayload) {
        return this.http.put<SupplierPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<SupplierSearchPayload>) {
        return this.http.post<PageResultPayload<SupplierPayload>>(`${this.url}/search-request`, searchPayload, {observe: 'response'});
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }


}
