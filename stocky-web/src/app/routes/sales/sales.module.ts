import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {SalesPosComponent} from './sales-pos/sales-pos.component';
import {SalesRoutingModule} from './sales-routing.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesRefundComponent } from './sales-refund/sales-refund.component';

const COMPONENTS: Array<Type<void>> = [
    SalesPosComponent
];

@NgModule({
    imports: [SalesRoutingModule, SharedModule],
    declarations: [...COMPONENTS, SalesOrderComponent, SalesRefundComponent],
    exports: [...COMPONENTS]

})
export class SalesModule {
}
