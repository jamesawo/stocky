import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Observable } from 'rxjs';
import { SettingPayload } from '../_data/setting.payload';
import { StockSettingUsecase } from '../_usecase/stock-setting.usecase';

@Component({
    selector: 'app-setting-stock',
    templateUrl: './setting-stock.component.html',
    styles: [],
})
export class SettingStockComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/stock', title: 'Stock Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private service: StockSettingUsecase) {}

    public ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {
        console.log(val);
    };
}
