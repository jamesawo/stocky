import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {StockPrice} from '../../stock/_data/stock.payload';
import {ProductDiscountPayload, ProductPayload, ProductSearchRequestPayload} from '../_data/product.payload';

@Injectable({providedIn: 'root'})
export class ProductUsecase {
    private url = environment.api.baseUrl + '/product';

    constructor(private http: HttpClient) {}

    public create(product: ProductPayload) {
        return this.http.post<ProductPayload>(`${this.url}/create`, product,
            {observe: 'response'});
    }

    public updatePrice(product: ProductPayload, price: StockPrice) {
        return this.http.post<ProductPayload>(`${this.url}/set-price/${product.id}`, price, {observe: 'response'});
    }

    public updateQuantity(product: ProductPayload, quantity: number) {
        return this.http.post<ProductPayload>(`${this.url}/set-quantity/${product.id}/${quantity}`, {}, {observe: 'response'});
    }

    public updateDiscount(arg: ProductDiscountPayload) {
        return this.http.post<boolean>(`${this.url}/set-discount`, arg, {observe: 'response'});
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
        return this.http.post<PageResultPayload<ProductPayload>>(`${this.url}/search-request`, searchPayload, {observe: 'response'});
    }

    public searchSalesProducts(searchPayload: PageSearchPayload<ProductSearchRequestPayload>) {
        return this.http.post<PageResultPayload<ProductPayload>>(`${this.url}/search-sales-products`, searchPayload, {observe: 'response'});
    }


}
