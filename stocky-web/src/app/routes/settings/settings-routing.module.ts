import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { SettingExpensesComponent } from './setting-expenses/setting-expenses.component';
import { SettingSalesComponent } from './setting-sales/setting-sales.component';
import { SettingStockComponent } from './setting-stock/setting-stock.component';
import { SettingProductComponent } from './setting-product/setting-product.component';
import { SettingPeopleComponent } from './setting-people/setting-people.component';

const routes: Routes = [
    { path: 'dashboard', component: SettingDashboardComponent },
    { path: 'expenses', component: SettingExpensesComponent },
    { path: 'sales', component: SettingSalesComponent },
    { path: 'people', component: SettingPeopleComponent },
    { path: 'stock', component: SettingStockComponent },
    { path: 'product', component: SettingProductComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingRoutingModule {}
