import { Component } from '@angular/core';
import { Crumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-product-variant-list',
    templateUrl: './product-variant-list.component.html',
    styles: [],
})
export class ProductVariantListComponent {
    public showPageHeader = true;
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Products' },
        { link: '/products/variants', title: 'Variants ' },
    ];

    public onHandleAction = () => {};
}
