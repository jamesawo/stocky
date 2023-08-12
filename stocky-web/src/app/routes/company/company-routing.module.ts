import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyBasicSetupComponent} from './company-basic-setup/company-basic-setup.component';
import {CompanyExpensesSetupComponent} from './company-expenses-setup/company-expenses-setup.component';
import {CompanyLocationSetupComponent} from './company-location-setup/company-location-setup.component';
import {CompanyPaymentOptionsComponent} from './company-payment-options/company-payment-options.component';
import {CompanyPeopleCustomerComponent} from './company-people/company-people-customer/company-people-customer.component';
import {CompanyPeopleEmployeesComponent} from './company-people/company-people-employees/company-people-employees.component';
import {CompanyPeopleSupplierComponent} from './company-people/company-people-supplier/company-people-supplier.component';
import {CompanyRoleSetupComponent} from './company-role-setup/company-role-setup.component';
import {CompanyStatusSetupComponent} from './company-status-setup/company-status-setup.component';
import {CompanyTaxSetupComponent} from './company-tax-setup/company-tax-setup.component';
import {CompanyUnitOfMeasureSetupComponent} from './company-unit-of-measure-setup/company-unit-of-measure-setup.component';


const routes: Routes = [
    {path: 'basic-setup', component: CompanyBasicSetupComponent},
    {path: 'tax-setup', component: CompanyTaxSetupComponent},
    {path: 'payment-options', component: CompanyPaymentOptionsComponent},
    {
        path: 'people', component: undefined, children: [
            {path: 'customers', component: CompanyPeopleCustomerComponent},
            {path: 'employees', component: CompanyPeopleEmployeesComponent},
            {path: 'suppliers', component: CompanyPeopleSupplierComponent}
        ]
    },
    {path: 'location-setup', component: CompanyLocationSetupComponent},
    {path: 'unit-of-measure-setup', component: CompanyUnitOfMeasureSetupComponent},
    {path: 'status-setup', component: CompanyStatusSetupComponent},
    {path: 'expenses-setup', component: CompanyExpensesSetupComponent},
    {path: 'role-setup', component: CompanyRoleSetupComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
}
