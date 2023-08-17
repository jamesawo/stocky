import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {ProductsModule} from '../products/products.module';
import {CompanyAdministratorFormComponent} from './_components/company-basic-setup/company-administrator-form/company-administrator-form.component';
import {CompanyBasicFormComponent} from './_components/company-basic-setup/company-basic-form/company-basic-form.component';
import {CompanyRegionFormComponent} from './_components/company-basic-setup/company-region-form/company-region-form.component';
import {CompanyExpenseAddBtnComponent} from './_components/company-expense-add-btn/company-expense-add-btn.component';
import {
    CompanyExpenseCategoryAddBtnComponent
} from './_components/company-expense-category/company-expense-category-add-btn/company-expense-category-add-btn.component';
import {
    CompanyExpenseCategoryDropdownComponent
} from './_components/company-expense-category/company-expense-category-dropdown/company-expense-category-dropdown.component';
import {
    CompanyExpenseCategoryFormComponent
} from './_components/company-expense-category/company-expense-category-form/company-expense-category-form.component';
import {
    CompanyExpenseCategoryTableComponent
} from './_components/company-expense-category/company-expense-category-table/company-expense-category-table.component';
import {CompanyLocationSearchComponent} from './_components/company-location-search/company-location-search.component';
import {
    CompanyPeopleCustomerAddBtnComponent
} from './_components/company-people/people-customer/company-people-customer-add-btn/company-people-customer-add-btn.component';
import {CustomerTagComponent} from './_components/company-people/people-customer/customer-tag/customer-tag.component';
import {
    CompanyPeopleEmployeeAddBtnComponent
} from './_components/company-people/people-employee/company-people-employee-add-btn/company-people-employee-add-btn.component';
import {
    CompanyPeopleSupplierAddBtnComponent
} from './_components/company-people/people-supplier/company-people-supplier-add-btn/company-people-supplier-add-btn.component';
import {CompanyRoleAddBtnComponent} from './_components/company-role/company-role-add-btn/company-role-add-btn.component';
import {CompanyRoleFormComponent} from './_components/company-role/company-role-form/company-role-form.component';
import {CompanyRoleSearchDropdownComponent} from './_components/company-role/company-role-search-dropdown/company-role-search-dropdown.component';
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
import {CompanyRoleSetupComponent} from './company-role-setup/company-role-setup.component';
import {CompanyRoutingModule} from './company-routing.module';
import {CompanyStatusSetupComponent} from './company-status-setup/company-status-setup.component';
import {CompanyTaxSetupComponent} from './company-tax-setup/company-tax-setup.component';
import {CompanyUnitOfMeasureSetupComponent} from './company-unit-of-measure-setup/company-unit-of-measure-setup.component';
import { CompanyRoleTableComponent } from './company-role-setup/components/company-role-table/company-role-table.component';

export const COMPANY_COMPONENTS: Array<Type<void>> = [
    CompanyUserSearchComponent,
    CompanyBasicSetupComponent,
    CompanyTaxSetupComponent,
    CompanyPaymentOptionsComponent,
    CompanyPeopleCustomerComponent,
    CompanyPeopleEmployeesComponent,
    CompanyPeopleSupplierComponent,
    CompanyPaymentOptionFormComponent,
    CompanyPaymentOptionTableComponent,
    CompanyPaymentOptionButtonComponent,
    CompanyLocationSetupComponent,
    CompanyLocationFormComponent,
    CompanyLocationTableComponent,
    CompanyLocationAddBtnComponent,
    CompanyExpensesSetupComponent,
    CompanyLocationSearchComponent,
    CompanyExpenseAddBtnComponent,
    CompanyExpenseCategoryDropdownComponent,
    CompanyExpenseCategoryAddBtnComponent,
    CompanyExpenseCategoryTableComponent,
    CompanyExpenseCategoryFormComponent,
    CompanyPeopleEmployeeAddBtnComponent,
    CompanyRoleSetupComponent,
    CompanyRoleSearchDropdownComponent,
    CompanyRoleAddBtnComponent,
    CompanyPeopleCustomerAddBtnComponent,
    CompanyPeopleSupplierAddBtnComponent,
    CompanyBasicFormComponent,
    CompanyAdministratorFormComponent,
    CompanyRegionFormComponent,
    CompanyRoleFormComponent,
    CustomerTagComponent,
    CompanyUnitOfMeasureSetupComponent,
    CompanyStatusSetupComponent
];

@NgModule({
    imports: [CompanyRoutingModule, SharedModule, ProductsModule],
    declarations: [...COMPANY_COMPONENTS, CompanyRoleTableComponent],
    exports: [...COMPANY_COMPONENTS]
})
export class CompanyModule {
}
