import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComingSoonComponent} from '../../shared/components/coming-soon/coming-soon.component';
import {ManageStockComponent} from './stock-manage-stock/manage-stock.component';
import {ReconcileStockComponent} from './stock-reconcile-stock/reconcile-stock.component';
import {RecordDamagedStockComponent} from './stock-record-damaged-stock/record-damaged-stock.component';
import {RecordStockBalanceComponent} from './stock-record-stock-balance/record-stock-balance.component';
import {ViewLowStockComponent} from './stock-view-low-stock/view-low-stock.component';
import {ViewStockCountComponent} from './stock-view-stock-count/view-stock-count.component';

const routes: Routes = [
    {path: 'manage-stock', component: ManageStockComponent},
    {path: 'view-stock-count', component: ViewStockCountComponent},
    {path: 'view-low-stock', component: ViewLowStockComponent},
    {path: 'reconcile-stock', component: ReconcileStockComponent},
    {path: 'record-stock-balance', component: RecordStockBalanceComponent},
    {path: 'record-damaged-stock', component: RecordDamagedStockComponent},
    {path: 'move-stock-items', component: ComingSoonComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule {
}
