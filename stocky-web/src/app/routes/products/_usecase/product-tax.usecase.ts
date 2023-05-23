import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductStatusPayload} from '../_data/product.payload';

@Injectable({
    providedIn: 'root',
})
export class ProductStatusUsecase {
    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/product-status';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductStatusPayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<ProductStatusPayload[]>(`${this.url}/all`);
    }

    public save(data: ProductStatusPayload) {
        return this.http.post<ProductStatusPayload>(`${this.url}/create`, data, {
            observe: 'response',
        });
    }

    public update(category: ProductStatusPayload) {
        return this.http.put<ProductStatusPayload>(`${this.url}/update`, category, {
            observe: 'response',
        });
    }

    public delete(id: number) {
        return this.http.delete(`${this.url}/delete/${id}`, {observe: 'response'});
    }

    public triggerChange(status: boolean) {
        this.trigger.next(status);
    }
}
