import { Component } from '@angular/core';
import { Crumbs } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
    public isOpenHeader = true;
    public isLoading = false;
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Product' },
        { link: '/products/product-list', title: 'All Products ' },
    ];
    onCancelHandler: any;
    onResetSearchForm: any;
    onSearchProducts: any;
    onCreateProduct: any;
}
