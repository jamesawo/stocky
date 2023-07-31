import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonPayload} from '../../../data/payload/common.payload';

@Injectable({providedIn: 'root'})
export class PaymentOptionUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/company/payment-option';

    constructor(private http: HttpClient) {}

    public save(payload: CommonPayload) {
        return this.http.post<CommonPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public getAll(filterIsActive = false) {
        return this.http.get<CommonPayload[]>(`${this.url}/all?filterIsActive=${filterIsActive}`);
    }

    public remove(id: number) {
        return this.http.delete(`${this.url}/remove/${id}`, {observe: 'response'});
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public update(payload: CommonPayload) {
        return this.http.put<CommonPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

}
