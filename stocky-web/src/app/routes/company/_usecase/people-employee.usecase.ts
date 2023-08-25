import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {EmployeePayload, EmployeeSearchPayload} from '../_data/company.payload';

@Injectable({providedIn: 'root'})
export class PeopleEmployeeUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/company/employee';

    constructor(private http: HttpClient) {}


    public save(payload: EmployeePayload) {
        return this.http.post<EmployeePayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public update(payload: EmployeePayload) {
        return this.http.post<boolean>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<EmployeeSearchPayload>) {
        return this.http.post<PageResultPayload<EmployeePayload>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }


}
