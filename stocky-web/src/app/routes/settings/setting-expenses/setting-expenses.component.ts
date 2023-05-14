import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Observable } from 'rxjs';
import { SettingPayload } from '../_data/setting.payload';
import { ExpensesSettingUsecase } from '../_usecase/expenses-setting.usecase';

@Component({
    selector: 'app-setting-expenses',
    templateUrl: './setting-expenses.component.html',
    styleUrls: ['./setting-expenses.component.css'],
})
export class SettingExpensesComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/expenses', title: 'Expenses Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private service: ExpensesSettingUsecase) {}

    ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {};
}
