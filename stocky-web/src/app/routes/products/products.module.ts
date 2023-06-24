import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {ProductBasicTabComponent} from './_components/product-basic-tab/product-basic-tab.component';
import {ProductCategorySearchComponent} from './_components/product-category-search/product-category-search.component';
import {ProductPriceTabComponent} from './_components/product-price-tab/product-price-tab.component';
import {ProductSearchComponent} from './_components/product-search/product-search.component';
import {ProductStatusAddBtnComponent} from './_components/product-status/product-status-add-btn/product-status-add-btn.component';
import {ProductStatusAddComponent} from './_components/product-status/product-status-add/product-status-add.component';
import {ProductStatusDropdownComponent} from './_components/product-status/product-status-dropdown/product-status-dropdown.component';
import {ProductTaxAddBtnComponent} from './_components/product-tax/product-tax-add-btn/product-tax-add-btn.component';
import {ProductTaxAddComponent} from './_components/product-tax/product-tax-add/product-tax-add.component';
import {ProductTaxDropdownComponent} from './_components/product-tax/product-tax-dropdown/product-tax-dropdown.component';
import {UnitOfMeasurementDropdownComponent} from './_components/unit-of-measurement/unit-of-measure-dropdown/unit-of-measurement-dropdown.component';
import {UnitOfMeasurementAddComponent} from './_components/unit-of-measurement/unit-of-measurement-add/unit-of-measurement-add.component';
import {ProductCategoryListComponent} from './catogory/category-list/product-category-list.component';
import {ProductAddComponent} from './product/product-add/product-add.component';
import {ProductListComponent} from './product/product-list/product-list.component';

import {ProductRoutingModule} from './products-routing.module';
import {ProductVariantListComponent} from './variant/variant-list/product-variant-list.component';

export const PRODUCT_COMPONENTS: Array<Type<void>> = [
    ProductListComponent,
    ProductAddComponent,
    ProductCategoryListComponent,
    ProductVariantListComponent,
    ProductCategorySearchComponent,
    ProductBasicTabComponent,
    UnitOfMeasurementAddComponent,
    UnitOfMeasurementDropdownComponent,
    ProductPriceTabComponent,
    ProductStatusAddComponent,
    ProductStatusDropdownComponent,
    ProductStatusAddBtnComponent,
    ProductTaxDropdownComponent,
    ProductTaxAddBtnComponent,
    ProductTaxAddComponent,
    ProductSearchComponent
];

@NgModule({
    imports: [ProductRoutingModule, SharedModule],
    declarations: [...PRODUCT_COMPONENTS],
    exports: [...PRODUCT_COMPONENTS]
})
export class ProductsModule {
}
