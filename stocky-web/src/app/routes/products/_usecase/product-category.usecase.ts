import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ProductCategoryPayload} from '../_data/product-category.payload';

@Injectable({providedIn: 'root'})
export class ProductCategoryUsecase {
    private url = environment.api.baseUrl + '/product-category';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductCategoryPayload>(`${this.url}/{id}`);
    }

    public getMany() {
        return this.http.get<ProductCategoryPayload[]>(`${this.url}`);
    }

    public save(category: ProductCategoryPayload) {
        return this.http.post<ProductCategoryPayload>(`${this.url}`, category, {observe: 'response'});
    }

    public update(category: ProductCategoryPayload) {
        return this.http.put(`${this.url}`, category);
    }
}
