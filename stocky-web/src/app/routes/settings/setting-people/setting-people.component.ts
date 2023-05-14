import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Observable } from 'rxjs';
import { SettingPayload } from '../_data/setting.payload';
import { PeopleSettingService } from '../_service/people-setting.service';

@Component({
    selector: 'app-setting-people',
    templateUrl: './setting-people.component.html',
    styles: [],
})
export class SettingPeopleComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/people', title: 'People Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private service: PeopleSettingService) {}

    ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {};
}
