import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesCashierShiftComponent} from './sales-cashier-shift/sales-cashier-shift.component';
import {SalesOrderComponent} from './sales-order/sales-order.component';
import {SalesPosComponent} from './sales-pos/sales-pos.component';
import {SalesRefundComponent} from './sales-refund/sales-refund.component';

const routes: Routes = [
    {
        path: 'sale-pos',
        component: SalesPosComponent,
        canDeactivate: [(component: SalesPosComponent) => component.canDeactivate()]
    },
    {path: 'order', component: SalesOrderComponent},
    {path: 'refund', component: SalesRefundComponent},
    {path: 'sale-shift', component: SalesCashierShiftComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesRoutingModule {
}
