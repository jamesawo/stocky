import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {AddUnitOfMeasurementComponent} from './_components/add-unit-of-measurement/add-unit-of-measurement.component';
import {ProductCategorySearchComponent} from './_components/product-category-search/product-category-search.component';
import {ProductCategoryListComponent} from './catogory/category-list/product-category-list.component';
import {ProductAddComponent} from './product/product-add/product-add.component';
import {ProductListComponent} from './product/product-list/product-list.component';

import {ProductRoutingModule} from './products-routing.module';
import {ProductVariantListComponent} from './variant/variant-list/product-variant-list.component';

export const PRODUCT_COMPONENTS = [
    ProductListComponent,
    ProductAddComponent,
    ProductCategoryListComponent,
    ProductVariantListComponent,
    ProductCategorySearchComponent,
    AddUnitOfMeasurementComponent,
];

@NgModule({
    imports: [ProductRoutingModule, SharedModule],
    declarations: [...PRODUCT_COMPONENTS],
    exports: [...PRODUCT_COMPONENTS],
})
export class ProductsModule {}
