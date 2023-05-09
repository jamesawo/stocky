import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCategoryListComponent } from './catogory/category-list/product-category-list.component';
import { ProductVariantListComponent } from './variant/variant-list/product-variant-list.component';

const routes: Routes = [
    { path: 'product-list', component: ProductListComponent },
    { path: 'category-list', component: ProductCategoryListComponent },
    { path: 'variants', component: ProductVariantListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
