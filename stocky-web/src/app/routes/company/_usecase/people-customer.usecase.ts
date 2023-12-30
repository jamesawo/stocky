import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CustomerNotifier, PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {CustomerPayload, CustomerSearchPayload} from '../_data/company.payload';

@Injectable({providedIn: 'root'})
export class PeopleCustomerUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    public customer: BehaviorSubject<CustomerNotifier> = new BehaviorSubject({});
    public customer$: Observable<CustomerNotifier> = this.customer.asObservable();

    private url = environment.api.baseUrl + '/company/customer';

    constructor(private http: HttpClient) {
    }


    public save(payload: CustomerPayload) {
        return this.http.post<CustomerPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }


    public update(payload: CustomerPayload) {
        return this.http.put<CustomerPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<CustomerSearchPayload>) {
        return this.http.post<PageResultPayload<CustomerPayload[]>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

    public setCustomer(value: CustomerNotifier) {
        if (value && value.customer && value.customer.id) {
            this.customer.next(value);
        } else {
            this.customer.next({});
        }
    }

}
