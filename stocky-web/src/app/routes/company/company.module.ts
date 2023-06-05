import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {ProductsModule} from '../products/products.module';
import {CompanyExpenseCategoryComponent} from './_components/company-expense-category/company-expense-category.component';
import {CompanyLocationSearchComponent} from './_components/company-location-search/company-location-search.component';
import {CompanyUserSearchComponent} from './_components/company-user-search/company-user-search.component';
import {CompanyBasicSetupComponent} from './company-basic-setup/company-basic-setup.component';
import {CompanyExpensesSetupComponent} from './company-expenses-setup/company-expenses-setup.component';
import {CompanyLocationAddBtnComponent} from './company-location-setup/company-location-add-btn/company-location-add-btn.component';
import {CompanyLocationFormComponent} from './company-location-setup/company-location-form/company-location-form.component';
import {CompanyLocationSetupComponent} from './company-location-setup/company-location-setup.component';
import {CompanyLocationTableComponent} from './company-location-setup/company-location-table/company-location-table.component';
import {CompanyPaymentOptionButtonComponent} from './company-payment-options/company-payment-option-button/company-payment-option-button.component';
import {CompanyPaymentOptionFormComponent} from './company-payment-options/company-payment-option-form/company-payment-option-form.component';
import {CompanyPaymentOptionTableComponent} from './company-payment-options/company-payment-option-table/company-payment-option-table.component';
import {CompanyPaymentOptionsComponent} from './company-payment-options/company-payment-options.component';
import {CompanyPeopleCustomerComponent} from './company-people/company-people-customer/company-people-customer.component';
import {CompanyPeopleEmployeesComponent} from './company-people/company-people-employees/company-people-employees.component';
import {CompanyPeopleSupplierComponent} from './company-people/company-people-supplier/company-people-supplier.component';
import {CompanyRoutingModule} from './company-routing.module';
import {CompanyTaxSetupComponent} from './company-tax-setup/company-tax-setup.component';
import { CompanyExpenseAddBtnComponent } from './_components/company-expense-add-btn/company-expense-add-btn.component';

export const COMPANY_COMPONENTS: Array<Type<void>> = [
    CompanyLocationSearchComponent,
    CompanyUserSearchComponent,
    CompanyBasicSetupComponent,
    CompanyTaxSetupComponent,
    CompanyPaymentOptionsComponent,
    CompanyPeopleCustomerComponent,
    CompanyPeopleEmployeesComponent,
    CompanyPeopleSupplierComponent,
    CompanyLocationSetupComponent,
    CompanyExpensesSetupComponent,
    CompanyPaymentOptionFormComponent,
    CompanyPaymentOptionTableComponent,
    CompanyPaymentOptionButtonComponent
];

@NgModule({
    imports: [CompanyRoutingModule, SharedModule, ProductsModule],
    declarations: [
        ...COMPANY_COMPONENTS,
        CompanyLocationFormComponent,
        CompanyLocationTableComponent,
        CompanyLocationAddBtnComponent,
        CompanyExpenseCategoryComponent,
        CompanyExpenseAddBtnComponent

    ],
    exports: [
        ...COMPANY_COMPONENTS
    ]
})
export class CompanyModule {
}
