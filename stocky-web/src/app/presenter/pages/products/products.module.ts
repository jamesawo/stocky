import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
    imports: [ProductRoutingModule],
    declarations: [
      ProductListComponent,
      ProductAddComponent,
      CategoryListComponent,
      CategoryAddComponent
    ],
})
export class ProductsModule {}
