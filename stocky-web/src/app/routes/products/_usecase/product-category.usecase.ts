import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ProductCategoryPoayload } from '../_data/product-category.poayload';

@Injectable({ providedIn: 'root' })
export class ProductCategoryUsecase {
    private url = environment.api.baseUrl + '/product-category';

    constructor(private http: HttpClient) {}

    public get(id: number) {
        return this.http.get<ProductCategoryPoayload>(`${this.url}/{id}`);
    }

    public getMany() {
        return this.http.get<ProductCategoryPoayload[]>(`${this.url}`);
    }

    public save(category: ProductCategoryPoayload) {
        return this.http.post(`${this.url}`, category);
    }

    public update(category: ProductCategoryPoayload) {
        return this.http.put(`${this.url}`, category);
    }
}
