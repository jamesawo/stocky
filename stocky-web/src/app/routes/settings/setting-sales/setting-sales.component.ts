import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Observable } from 'rxjs';
import { SettingPayload } from '../_data/setting.payload';
import { SaleSettingService } from '../_service/sale-setting.service';

@Component({
    selector: 'app-setting-sales',
    templateUrl: './setting-sales.component.html',
    styles: [],
})
export class SettingSalesComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/stock', title: 'Stock Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private service: SaleSettingService) {}

    public ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {
        console.log(val);
    };
}
