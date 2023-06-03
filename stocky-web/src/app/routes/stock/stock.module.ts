import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyModule} from '../company/company.module';
import {ProductsModule} from '../products/products.module';
import {StockCodeSearchComponent} from './_components/stock-code-search/stock-code-search.component';
import {StockProductLocationFormComponent} from './_components/stock-product-location-form/stock-product-location-form.component';
import {ManageStockComponent} from './manage-stock/manage-stock.component';
import {ReconcileStockComponent} from './reconcile-stock/reconcile-stock.component';
import {RecordDamagedStockComponent} from './record-damaged-stock/record-damaged-stock.component';
import {RecordStockBalanceComponent} from './record-stock-balance/record-stock-balance.component';
import {StockRoutingModule} from './stock-routing.module';
import {ViewLowStockComponent} from './view-low-stock/view-low-stock.component';
import {ViewStockCountComponent} from './view-stock-count/view-stock-count.component';

export const STOCK_COMPONENTS: Array<Type<void>> = [
    ManageStockComponent,
    ViewStockCountComponent,
    ViewLowStockComponent,
    ReconcileStockComponent,
    RecordStockBalanceComponent,
    RecordDamagedStockComponent,
    StockProductLocationFormComponent,
    StockCodeSearchComponent
];

@NgModule({
    imports: [StockRoutingModule, SharedModule, ProductsModule, CompanyModule],
    declarations: [...STOCK_COMPONENTS
    ],
    exports: [...STOCK_COMPONENTS]
})
export class StockModule {
}
