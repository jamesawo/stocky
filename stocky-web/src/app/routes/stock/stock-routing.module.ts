import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageStockComponent} from './manage-stock/manage-stock.component';
import {MoveStockItemComponent} from './move-stock-item/move-stock-item.component';
import {ReconcileStockComponent} from './reconcile-stock/reconcile-stock.component';
import {RecordDamagedStockComponent} from './record-damaged-stock/record-damaged-stock.component';
import {RecordStockBalanceComponent} from './record-stock-balance/record-stock-balance.component';
import {ViewLowStockComponent} from './view-low-stock/view-low-stock.component';
import {ViewStockCountComponent} from './view-stock-count/view-stock-count.component';

const routes: Routes = [
    {path: 'manage-stock', component: ManageStockComponent},
    {path: 'view-stock-count', component: ViewStockCountComponent},
    {path: 'view-low-stock', component: ViewLowStockComponent},
    {path: 'reconcile-stock', component: ReconcileStockComponent},
    {path: 'record-stock-balance', component: RecordStockBalanceComponent},
    {path: 'record-damaged-stock', component: RecordDamagedStockComponent},
    {path: 'move-stock-items', component: MoveStockItemComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule {
}
