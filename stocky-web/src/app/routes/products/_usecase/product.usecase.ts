import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {ProductPayload, ProductSearchRequestPayload} from '../_data/product.payload';

@Injectable({providedIn: 'root'})
export class ProductUsecase {
    private url = environment.api.baseUrl + '/product';

    constructor(private http: HttpClient) {}

    public create(product: ProductPayload) {
        return this.http.post<ProductPayload>(`${this.url}/create`, product,
            {observe: 'response'});
    }

    public saveMany(products: ProductPayload[]) {
        // todo implement method
    }

    public uploadFile(file: any) {
        // implement method
    }

    public updateOne(product: ProductPayload) {
        // implement method
    }

    public searchProducts(searchPayload: PageSearchPayload<ProductSearchRequestPayload>) {
        return this.http.post<PageResultPayload<ProductPayload>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }


}
