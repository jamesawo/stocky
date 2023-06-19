import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductTaxPayload} from '../_data/product.payload';

@Injectable({
    providedIn: 'root'
})
export class ProductTaxUsecase {
    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/product/tax';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductTaxPayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<ProductTaxPayload[]>(`${this.url}/all`);
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public save(data: ProductTaxPayload) {
        return this.http.post<ProductTaxPayload>(`${this.url}/create`, data, {
            observe: 'response'
        });
    }

    public update(category: ProductTaxPayload) {
        return this.http.put<ProductTaxPayload>(`${this.url}/update`, category, {
            observe: 'response'
        });
    }

    public delete(id: number) {
        return this.http.delete(`${this.url}/delete/${id}`, {observe: 'response'});
    }

    public triggerChange(status: boolean) {
        this.trigger.next(status);
    }
}
