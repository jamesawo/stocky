import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyModule} from '../company/company.module';
import {ProductsModule} from '../products/products.module';
import {StockCodeSearchComponent} from './_components/stock-code-search/stock-code-search.component';
import {StockFormComponent} from './_components/stock-manage/stock-form/stock-form.component';
import {StockItemExtraExpensesComponent} from './_components/stock-manage/stock-item-extra-expenses/stock-item-extra-expenses.component';
import {StockItemPanelHeaderComponent} from './_components/stock-manage/stock-item-panel-header/stock-item-panel-header.component';
import {StockItemSettlementFormComponent} from './_components/stock-manage/stock-item-settlement-form/stock-item-settlement-form.component';
import {StockManageAddComponent} from './_components/stock-manage/stock-manage-add/stock-manage-add.component';
import {StockProductLocationFormComponent} from './_components/stock-product-location-form/stock-product-location-form.component';
import {ManageStockComponent} from './stock-manage-stock/manage-stock.component';
import {MoveStockItemComponent} from './stock-move-stock-item/move-stock-item.component';
import {ReconcileStockComponent} from './stock-reconcile-stock/reconcile-stock.component';
import {RecordDamagedStockComponent} from './stock-record-damaged-stock/record-damaged-stock.component';
import {RecordStockBalanceComponent} from './stock-record-stock-balance/record-stock-balance.component';
import {StockRoutingModule} from './stock-routing.module';
import {ViewLowStockComponent} from './stock-view-low-stock/view-low-stock.component';
import {ViewStockCountComponent} from './stock-view-stock-count/view-stock-count.component';

export const STOCK_COMPONENTS: Array<Type<void>> = [
    ManageStockComponent,
    ViewStockCountComponent,
    ViewLowStockComponent,
    ReconcileStockComponent,
    RecordStockBalanceComponent,
    RecordDamagedStockComponent,
    StockProductLocationFormComponent,
    StockCodeSearchComponent,
    MoveStockItemComponent,
    StockManageAddComponent,
    StockItemSettlementFormComponent,
    StockItemExtraExpensesComponent,
    StockItemPanelHeaderComponent,
    StockFormComponent
];

@NgModule({
    imports: [StockRoutingModule, SharedModule, ProductsModule, CompanyModule],
    declarations: [...STOCK_COMPONENTS],
    exports: [...STOCK_COMPONENTS]
})
export class StockModule {
}
