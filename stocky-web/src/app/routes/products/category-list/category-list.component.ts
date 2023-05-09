import { Component } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
    public isExpanded = true;
    public isLoading = false;
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Product' },
        { link: '/products/category-list', title: 'Categories' },
    ];
    public isAllCurrentPageChecked = false;
    public indeterminate = false;
    public showModal = false;

    public onAddCategory = () => {
        this.showModal = true;
    };

    public onCheckedAllRecord(checked: boolean) {}

    public handleOk = () => {};

    public handleCancel = () => {
        this.showModal = false;
    };
}
