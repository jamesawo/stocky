import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {SalesModule} from '../sales/sales.module';
import {ReportCustomerComponent} from './report-customer/report-customer.component';
import {ReportEmployeeComponent} from './report-employee/report-employee.component';
import {ReportExpenseComponent} from './report-expense/report-expense.component';
import {ReportRoutingModule} from './report-routing.module';
import {ReportSalesComponent} from './report-sales/report-sales.component';
import {ReportStockComponent} from './report-stock/report-stock.component';

const COMPONENTS: Array<Type<void>> = [
    ReportSalesComponent,
    ReportExpenseComponent,
    ReportEmployeeComponent,
    ReportCustomerComponent,
    ReportStockComponent
];

@NgModule({
    imports: [ReportRoutingModule, SharedModule, SalesModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ReportModule {
}
