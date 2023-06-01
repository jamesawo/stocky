import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {PRODUCT_LIST_CRUMBS} from 'src/app/data/constant/crumb.constant';
import {PageSearchPayload} from 'src/app/data/payload/common.interface';
import {PagePayload} from 'src/app/data/payload/common.payload';
import {ProductSearchPayload} from 'src/app/routes/products/_data/product.payload';
import {ProductUsecase} from 'src/app/routes/products/_usecase/product.usecase';
import {handleUsecaseRequest} from 'src/app/shared/utils/util';
import {TableCol} from '../../../../shared/components/table/table.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    public isOpenHeader = true;
    public isLoading = false;
    public isLoadingTable = false;
    public crumbs = PRODUCT_LIST_CRUMBS;
    public searchPayload = new ProductSearchPayload();
    public pageRequest = new PagePayload();
    public tableCols: TableCol[] = [
        {title: 'Category'},
        {title: 'Product Name'},
        {title: 'Brand Name'},
        {title: 'SKU'},
        {title: 'Type'},
        {title: 'Date Created'}
    ];
    public tableData?: Observable<any>;

    constructor(
        private router: Router,
        private usecase: ProductUsecase,
        private notification: NzNotificationService
    ) {}

    public onCancelHandler = () => {};

    public handleCreateProduct = async (): Promise<void> => {
        await this.router.navigateByUrl('/products/product-add');
    };

    public onSearchProducts = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<ProductSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const observable = this.usecase.searchProducts(searchPayload);
        const response = await handleUsecaseRequest(observable, this.notification);

        if (response.ok) {
            this.tableData = of(response.body?.result);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onResetSearchForm = (): void => {
        this.searchPayload = new ProductSearchPayload();
        this.tableData = of();
    };

    public onPageSizeChange(value: number) {
        this.pageRequest.pageSize = value;
        this.onSearchProducts().then();
    }

    public onPageIndexChange(value: number): void {
        this.pageRequest.pageNumber = value;
        this.onSearchProducts().then();

    }

}
