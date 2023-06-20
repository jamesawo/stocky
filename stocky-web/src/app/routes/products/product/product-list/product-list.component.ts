import {HttpResponse} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {PRODUCT_LIST_CRUMBS} from 'src/app/data/constant/crumb.constant';
import {PageSearchPayload} from 'src/app/data/payload/common.interface';
import {PagePayload} from 'src/app/data/payload/common.payload';
import {ProductPayload, ProductSearchRequestPayload} from 'src/app/routes/products/_data/product.payload';
import {ProductUsecase} from 'src/app/routes/products/_usecase/product.usecase';
import {handleUsecaseRequest} from 'src/app/shared/utils/util';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {TableCol} from '../../../../shared/components/table/table.component';
import {ProductAddComponent} from '../product-add/product-add.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    @ViewChild('productAddComponent')
    public productAddComponent?: ProductAddComponent;


    public tableData?: Observable<any>;
    public isOpenHeader = true;
    public isLoading = false;
    public isLoadingTable = false;
    public pageRequest = new PagePayload();
    public searchPayload = new ProductSearchRequestPayload();
    public showDrawer = false;

    public crumbs = PRODUCT_LIST_CRUMBS;
    public tableCols: TableCol[] = [
        {title: 'Category'},
        {title: 'Product Name'},
        {title: 'Brand Name'},
        {title: 'SKU'},
        {title: 'Type'},
        {title: 'Date Created'},
        {title: 'Action'}
    ];
    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private router: Router,
        private usecase: ProductUsecase,
        private notification: NzNotificationService
    ) {}

    public onCancelHandler = () => {};

    public handleCreateProduct = async (): Promise<void> => {
        this.showDrawer = !this.showDrawer;
    };

    public onSearchProducts = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<ProductSearchRequestPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const observable = this.usecase.searchProducts(searchPayload);
        const response = await handleUsecaseRequest(observable, this.notification);

        if (response.ok && response.body) {
            this.displayResponseBodyOnTable(response.body?.result!);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onResetSearchForm = (): void => {
        this.searchPayload = new ProductSearchRequestPayload();
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

    public callComponentCreateHandler() {
        this.productAddComponent?.onSaveProduct();
    }

    public handleFormResponse(response: HttpResponse<ProductPayload>) {
        if (response.ok) {
            this.displayResponseBodyOnTable([response.body!]);
            this.showDrawer = !this.showDrawer;
        }
    }

    private displayResponseBodyOnTable(body: ProductPayload[]) {
        this.tableData = of(body);
    }
}
