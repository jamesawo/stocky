import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComingSoonComponent} from '../../shared/components/coming-soon/coming-soon.component';
import {ReportSalesComponent} from './report-sales/report-sales.component';

const routes: Routes = [
    {path: 'sales-report', component: ReportSalesComponent},
    {path: 'expenses-report', component: ComingSoonComponent},
    {path: 'employees-report', component: ComingSoonComponent},
    {path: 'customers-report', component: ComingSoonComponent},
    {path: 'stock-report', component: ComingSoonComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
