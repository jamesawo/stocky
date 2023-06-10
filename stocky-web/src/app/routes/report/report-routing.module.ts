import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'sales-report', component: undefined},
    {path: 'expense-report', component: undefined},
    {path: 'employee-report', component: undefined},
    {path: 'customer-report', component: undefined},
    {path: 'stock-report', component: undefined}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
