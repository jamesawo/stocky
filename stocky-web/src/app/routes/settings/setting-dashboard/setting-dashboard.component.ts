import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DashboardSettingUsecase } from '../_usecase/dashboard-setting.usecase';
import { SettingPayload } from '../_data/setting.payload';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-setting-dashboard',
    templateUrl: './setting-dashboard.component.html',
})
export class SettingDashboardComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/dashboard', title: 'Dashboard Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private dashboardService: DashboardSettingUsecase) {}

    ngOnInit(): void {
        this.settings = this.dashboardService.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {
        console.log(val);
    };
}
