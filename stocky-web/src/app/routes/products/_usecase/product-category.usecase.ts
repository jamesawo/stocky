import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ProductCategoryPayload} from '../_data/product.payload';

@Injectable({providedIn: 'root'})
export class ProductCategoryUsecase {
    private url = environment.api.baseUrl + '/product-category';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductCategoryPayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<ProductCategoryPayload[]>(`${this.url}/all`);
    }

    public save(category: ProductCategoryPayload) {
        return this.http.post<ProductCategoryPayload>(`${this.url}/create`, category, {
            observe: 'response',
        });
    }

    public update(category: ProductCategoryPayload) {
        return this.http.put<ProductCategoryPayload>(`${this.url}/update`, category, {
            observe: 'response',
        });
    }

    public delete(id: number) {
        return this.http.delete(`${this.url}/delete/${id}`, {observe: 'response'});
    }
}
