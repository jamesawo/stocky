import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {PRODUCT_LIST_CRUMBS} from '../../../../data/constant/crumb.constant';
import {handleUsecaseRequest} from '../../../../shared/utils/util';
import {ProductSearchPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    public isOpenHeader = true;
    public isLoading = false;
    public crumbs = PRODUCT_LIST_CRUMBS;
    public searchPayload = new ProductSearchPayload();

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
        const response = await handleUsecaseRequest(
            this.usecase.searchProducts(this.searchPayload),
            this.notification
        );

        if (response.ok) {
            console.log(response.body);
        }
    };

    public onResetSearchForm = (): void => {
        this.searchPayload = new ProductSearchPayload();
    };

}
