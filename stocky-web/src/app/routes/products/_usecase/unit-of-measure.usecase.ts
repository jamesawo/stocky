import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductUnitOfMeasurePayload} from '../_data/product-unit-of-measure.payload';

@Injectable({providedIn: 'root'})
export class UnitOfMeasureUsecase {
    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();

    private url = environment.api.baseUrl + '/product/unit-of-measurement';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductUnitOfMeasurePayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<ProductUnitOfMeasurePayload[]>(`${this.url}/all`);
    }

    public save(category: ProductUnitOfMeasurePayload) {
        return this.http.post<ProductUnitOfMeasurePayload>(`${this.url}/create`, category, {
            observe: 'response'
        });
    }

    public update(category: ProductUnitOfMeasurePayload) {
        return this.http.put<ProductUnitOfMeasurePayload>(`${this.url}/update`, category, {
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
