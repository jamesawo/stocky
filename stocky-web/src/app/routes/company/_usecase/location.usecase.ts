import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocationPayload} from '../_data/company.payload';

@Injectable({providedIn: 'root'})
export class LocationUsecase {

    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/company/location';

    constructor(private http: HttpClient) {}

    public save(payload: LocationPayload) {
        return this.http.post<LocationPayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public getAll() {
        return this.http.get<LocationPayload[]>(`${this.url}/all`);
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }


    public remove(id: number) {
        return this.http.delete(`${this.url}/remove/${id}`, {observe: 'response'});
    }

    public update(payload: LocationPayload) {
        return this.http.put<LocationPayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

}
