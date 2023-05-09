import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './products-routing.module';
import { SharedModule } from '@shared';
import { ProductVariantListComponent } from './variant/variant-list/product-variant-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCategoryListComponent } from './catogory/category-list/product-category-list.component';
import { CategoryAddComponent } from './catogory/category-add/category-add.component';

export const PRODUCT_COMPONENTS = [
    ProductListComponent,
    ProductAddComponent,
    ProductCategoryListComponent,
    CategoryAddComponent,
    ProductVariantListComponent,
];

@NgModule({
    imports: [ProductRoutingModule, SharedModule],
    declarations: [...PRODUCT_COMPONENTS],
    exports: [...PRODUCT_COMPONENTS],
})
export class ProductsModule {}
