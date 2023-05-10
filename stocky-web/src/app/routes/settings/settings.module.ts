import { NgModule } from '@angular/core';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { SettingExpensesComponent } from './setting-expenses/setting-expenses.component';
import { SettingRoutingModule } from './settings-routing.module';
import { SharedModule } from '@shared';
import { SettingSalesComponent } from './setting-sales/setting-sales.component';
import { SettingStockComponent } from './setting-stock/setting-stock.component';
import { SettingProductComponent } from './setting-product/setting-product.component';
import { SettingPeopleComponent } from './setting-people/setting-people.component';

export const PRODUCT_COMPONENTS = [
    SettingDashboardComponent,
    SettingExpensesComponent,
    SettingSalesComponent,
    SettingPeopleComponent,
    SettingStockComponent,
    SettingProductComponent,
];

@NgModule({
    imports: [SharedModule, SettingRoutingModule],
    declarations: [...PRODUCT_COMPONENTS],
    exports: [...PRODUCT_COMPONENTS],
})
export class SettingsModule {}
