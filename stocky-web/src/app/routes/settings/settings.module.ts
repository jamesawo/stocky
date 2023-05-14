import { NgModule } from '@angular/core';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { SettingExpensesComponent } from './setting-expenses/setting-expenses.component';
import { SettingRoutingModule } from './settings-routing.module';
import { SharedModule } from '@shared';
import { SettingSalesComponent } from './setting-sales/setting-sales.component';
import { SettingStockComponent } from './setting-stock/setting-stock.component';
import { SettingProductComponent } from './setting-product/setting-product.component';
import { SettingPeopleComponent } from './setting-people/setting-people.component';
import { SettingFormComponent } from './_components/setting-field/setting-form.component';
import { DashboardSettingUsecase } from './_usecase/dashboard-setting.usecase';
import { StockSettingUsecase } from './_usecase/stock-setting.usecase';
import { ExpensesSettingUsecase } from './_usecase/expenses-setting.usecase';

export const COMPONENTS = [
    SettingDashboardComponent,
    SettingExpensesComponent,
    SettingSalesComponent,
    SettingPeopleComponent,
    SettingStockComponent,
    SettingProductComponent,
    SettingFormComponent,
];

export const PROVIDERS = [
    DashboardSettingUsecase,
    StockSettingUsecase,
    ExpensesSettingUsecase,
];

@NgModule({
    imports: [SharedModule, SettingRoutingModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    providers: [...PROVIDERS],
})
export class SettingsModule {}
