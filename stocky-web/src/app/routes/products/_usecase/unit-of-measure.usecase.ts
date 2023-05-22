import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {UnitOfMeasurePayload} from '../_data/unit-of-measure.payload';

@Injectable({providedIn: 'root'})
export class UnitOfMeasureUsecase {
    private url = environment.api.baseUrl + '/product-unit-of-measurement';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<UnitOfMeasurePayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<UnitOfMeasurePayload[]>(`${this.url}/all`);
    }

    public save(category: UnitOfMeasurePayload) {
        return this.http.post<UnitOfMeasurePayload>(`${this.url}/create`, category, {
            observe: 'response',
        });
    }

    public update(category: UnitOfMeasurePayload) {
        return this.http.put<UnitOfMeasurePayload>(`${this.url}/update`, category, {
            observe: 'response',
        });
    }

    public delete(id: number) {
        return this.http.delete(`${this.url}/delete/${id}`, {observe: 'response'});
    }
}
