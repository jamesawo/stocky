import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable} from 'rxjs';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {UtilService} from '../../../shared/utils/util.service';
import {SettingPayload} from '../_data/setting.payload';
import {SaleSettingUsecase} from '../_usecase/sale-setting.usecase';

@Component({
    selector: 'app-setting-sales',
    templateUrl: './setting-sales.component.html',
    styles: []
})
export class SettingSalesComponent implements OnInit {
    public crumbs: Crumbs[] = [
        {link: '/dashboard', title: 'Dashboard'},
        {title: 'Setting'},
        {link: '/settings/sales', title: 'Sales Setting '}
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(
        private service: SaleSettingUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = async (settings: SettingPayload[]) => {
        await this.util.handleUsecaseRequest(this.service.updateSettings(settings), this.notification);
    };
}
