import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonPayload} from '../../../../data/payload/common.payload';

@Injectable({providedIn: 'root'})
export class ExpenseCategoryUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/company/expenses/category';

    constructor(private http: HttpClient) {}

    public save(payload: CommonPayload) {
        return this.http.post<CommonPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public getAll() {
        return this.http.get<CommonPayload[]>(`${this.url}/all`);
    }

    public remove(id: number) {
        return this.http.delete(`${this.url}/remove/${id}`, {observe: 'response'});
    }

    public update(payload: CommonPayload) {
        return this.http.put<CommonPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

}
