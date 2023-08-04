import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComingSoonComponent} from '../../shared/components/coming-soon/coming-soon.component';
import {SalesCashierShiftComponent} from './sales-cashier-shift/sales-cashier-shift.component';
import {SalesPosComponent} from './sales-pos/sales-pos.component';
import {SalesReprintReceiptComponent} from './sales-reprint-receipt/sales-reprint-receipt.component';

const routes: Routes = [
    {
        path: 'sale-pos',
        component: SalesPosComponent,
        canDeactivate: [(component: SalesPosComponent) => component.canDeactivate()]
    },
    {path: 'order', component: ComingSoonComponent},
    {path: 'refund', component: ComingSoonComponent},
    {path: 'sale-shift', component: SalesCashierShiftComponent},
    {path: 'reprint-receipt', component: SalesReprintReceiptComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesRoutingModule {
}
