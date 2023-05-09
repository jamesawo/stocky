import { Component } from '@angular/core';
import { Crumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
    public showPageHeader = false;

    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Product' },
        { link: '/products/product-add', title: 'Add Product ' },
    ];
}
