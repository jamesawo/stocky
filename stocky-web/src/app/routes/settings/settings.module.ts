import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {SettingFieldDateComponent} from './_components/setting-field-date/setting-field-date.component';
import {SettingFieldInputComponent} from './_components/setting-field-input/setting-field-input.component';
import {SettingFieldRadioComponent} from './_components/setting-field-radio/setting-field-radio.component';
import {SettingFieldSelectComponent} from './_components/setting-field-select/setting-field-select.component';
import {SettingFieldTextareaComponent} from './_components/setting-field-textarea/setting-field-textarea.component';
import {SettingFieldToggleComponent} from './_components/setting-field-toggle/setting-field-toggle.component';
import {SettingFormComponent} from './_components/setting-field/setting-form.component';
import {DashboardSettingUsecase} from './_usecase/dashboard-setting.usecase';
import {ExpensesSettingUsecase} from './_usecase/expenses-setting.usecase';
import {StockSettingUsecase} from './_usecase/stock-setting.usecase';
import {SettingDashboardComponent} from './setting-dashboard/setting-dashboard.component';
import {SettingExpensesComponent} from './setting-expenses/setting-expenses.component';
import {SettingPeopleComponent} from './setting-people/setting-people.component';
import {SettingProductComponent} from './setting-product/setting-product.component';
import {SettingSalesComponent} from './setting-sales/setting-sales.component';
import {SettingStockComponent} from './setting-stock/setting-stock.component';
import {SettingRoutingModule} from './settings-routing.module';

export const COMPONENTS = [
    SettingDashboardComponent,
    SettingExpensesComponent,
    SettingSalesComponent,
    SettingPeopleComponent,
    SettingStockComponent,
    SettingProductComponent,
    SettingFormComponent,
    SettingFieldInputComponent,
    SettingFieldSelectComponent,
    SettingFieldTextareaComponent,
    SettingFieldRadioComponent,
    SettingFieldDateComponent,
    SettingFieldToggleComponent
];

export const PROVIDERS = [
    DashboardSettingUsecase,
    StockSettingUsecase,
    ExpensesSettingUsecase
];

@NgModule({
    imports: [SharedModule, SettingRoutingModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    providers: [...PROVIDERS]
})
export class SettingsModule {
}
