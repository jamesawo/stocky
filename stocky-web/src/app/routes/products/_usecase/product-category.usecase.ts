import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductCategoryPayload} from '../_data/product.payload';

@Injectable({providedIn: 'root'})
export class ProductCategoryUsecase {
    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();
    private url = environment.api.baseUrl + '/product/category';

    constructor(private http: HttpClient) {
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

    public get(id: number) {
        return this.http.get<ProductCategoryPayload>(`${this.url}/get/{id}`);
    }

    public getMany() {
        return this.http.get<ProductCategoryPayload[]>(`${this.url}/all`);
    }

    public save(category: ProductCategoryPayload) {
        return this.http.post<ProductCategoryPayload>(`${this.url}/create`, category, {
            observe: 'response'
        });
    }

    public update(category: ProductCategoryPayload) {
        return this.http.put<ProductCategoryPayload>(`${this.url}/update`, category, {
            observe: 'response'
        });
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.url}/delete/${id}`, {observe: 'response'});
    }

    public search(term: string) {
        return this.http.get<ProductCategoryPayload[]>(`${this.url}/search?term=${term}`, {observe: 'response'});
    }

    public toggleActiveStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public getProductCategoryUploadURL() {
        return `${this.url}/upload`;
    }

    public downloadTemplate(): Observable<Blob> {
        return this.http.get(`${this.url}/download-template`, {
            responseType: 'blob'
        });
    }

    public uploadDataFile(form: FormData): Observable<HttpResponse<Blob>> {
        const headers = new HttpHeaders({'Accept': 'application/octet-stream'});
        return this.http.post<Blob>(`${this.url}/upload`, form, {
            headers,
            observe: 'response',
            responseType: 'blob' as 'json'
        });
    }

}
