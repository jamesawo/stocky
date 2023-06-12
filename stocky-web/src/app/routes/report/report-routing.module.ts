import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportCustomerComponent} from './report-customer/report-customer.component';
import {ReportEmployeeComponent} from './report-employee/report-employee.component';
import {ReportExpenseComponent} from './report-expense/report-expense.component';
import {ReportSalesComponent} from './report-sales/report-sales.component';
import {ReportStockComponent} from './report-stock/report-stock.component';

const routes: Routes = [
    {path: 'sales-report', component: ReportSalesComponent},
    {path: 'expenses-report', component: ReportExpenseComponent},
    {path: 'employees-report', component: ReportEmployeeComponent},
    {path: 'customers-report', component: ReportCustomerComponent},
    {path: 'stock-report', component: ReportStockComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
