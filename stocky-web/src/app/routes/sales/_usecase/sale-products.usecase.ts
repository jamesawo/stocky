import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {BehaviorSubject, catchError, map, throwError} from 'rxjs';
import {PageResultPayload} from '../../../data/payload/common.interface';
import {PagePayload} from '../../../data/payload/common.payload';
import {ProductCategoryPayload, ProductPayload, ProductSearchRequestPayload} from '../../products/_data/product.payload';
import {ProductUsecase} from '../../products/_usecase/product.usecase';
import {SaleCartUsecase} from './sale-cart.usecase';

@Injectable({
    providedIn: 'root'
})
export class SaleProductsUsecase {
    public searching = new BehaviorSubject<boolean>(false);
    public searching$ = this.searching.asObservable();

    public searchResult = new BehaviorSubject<PageResultPayload<ProductPayload> | null>(null);
    public searchResult$ = this.searchResult.asObservable();
    
    public categories = new BehaviorSubject<ProductCategoryPayload[]>([]);
    public categories$ = this.categories.asObservable();

    constructor(
        private http: HttpClient,
        private cartUsecase: SaleCartUsecase,
        private productUsecase: ProductUsecase,
        private notification: NzNotificationService
    ) {}


    public setCategories(categories: ProductCategoryPayload[]) {
        this.categories.next([...categories]);
    }

    public setSearching(value: boolean) {
        this.searching.next(value);
    }

    public search(term: string, pageRequest?: PagePayload) {
        this.setSearching(true);

        const page = pageRequest ?? new PagePayload();
        const searchRequest = new ProductSearchRequestPayload();
        searchRequest.productOrBrandName = term;
        searchRequest.categories = this.categories.value;

        return this.searchProductsList(searchRequest, page);
    }

    private searchProductsList(searchRequest: ProductSearchRequestPayload, page: PagePayload) {

        return this.productUsecase.searchSalesProducts({searchRequest, page}).pipe(
            map(value => {
                if (value && value.ok) {

                    this.setSearching(false);
                    this.searchResult.next(value.body);

                    return value.body;
                }
                this.setSearching(false);
                return {};
            }),
            catchError((err: any) => this.handleErrorWhenSearching(err))
        );
    }

    private handleErrorWhenSearching(err: any) {

        this.setSearching(false);
        this.notification.error('An Error Occurred!', err.message ?? 'Failed to search products');
        return throwError(err);
    }

}
