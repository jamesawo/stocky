import {Component} from '@angular/core';
import {TAX_SETUP} from '../../../data/constant/crumb.constant';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {ProductCategoryPayload} from '../../products/_data/product.payload';

@Component({
    selector: 'app-company-tax-setup',
    templateUrl: './company-tax-setup.component.html',
    styles: []
})
export class CompanyTaxSetupComponent {
    public crumbs: Crumbs[] = TAX_SETUP;
    public isExpanded = true;
    public isLoading = false;
    public isLoadingSearch = false;
    public showModal = false;


    public onOpenModal = () => {
        this.showModal = true;
    };

    public onCloseModal = () => {
        this.showModal = false;
    };
    public onSearchCategory = async () => {};

    public onResetSearch = () => {};

    public onCancelSearch = () => {};

    public onCreate = async () => {};

    public onCancelEdit = async (item: ProductCategoryPayload) => {};

    public onToggleEdit = (item: ProductCategoryPayload) => {
    };

    public onSaveEdit = async (item: ProductCategoryPayload) => {};

    public onConfirmDelete = async (id: number) => {};

    public onCancelDelete = async () => {};

    public onParentCategorySelected = (parent: ProductCategoryPayload) => {};

    public onCacheValueChange = (change: any, item: ProductCategoryPayload, field: string) => {};

    public canEditItem(item: any) {}

    private onResetPayload() {}

}
