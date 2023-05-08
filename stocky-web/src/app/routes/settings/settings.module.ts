import { NgModule } from '@angular/core';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { SettingExpensesComponent } from './setting-expenses/setting-expenses.component';
import { SettingRoutingModule } from './settings-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SettingDashboardComponent, SettingExpensesComponent],
    imports: [CommonModule, SettingRoutingModule]
})
export class SettingsModule {}
