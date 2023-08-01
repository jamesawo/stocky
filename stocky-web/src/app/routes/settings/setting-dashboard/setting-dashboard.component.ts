import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {SettingPayload} from '../_data/setting.payload';
import {DashboardSettingUsecase} from '../_usecase/dashboard-setting.usecase';

@Component({
    selector: 'app-setting-dashboard',
    templateUrl: './setting-dashboard.component.html'
})
export class SettingDashboardComponent implements OnInit {
    public crumbs: Crumbs[] = [
        {link: '/dashboard', title: 'Dashboard'},
        {title: 'Setting'},
        {link: '/settings/dashboard', title: 'Dashboard Setting '}
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private dashboardService: DashboardSettingUsecase) {}

    ngOnInit(): void {
        this.settings = this.dashboardService.getSettings();
    }

}
