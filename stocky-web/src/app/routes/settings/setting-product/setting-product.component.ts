import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Observable } from 'rxjs';
import { SettingPayload } from '../_data/setting.payload';
import { ProductSettingUsecase } from '../_usecase/product-setting.usecase';

@Component({
    selector: 'app-setting-product',
    templateUrl: './setting-product.component.html',
    styles: [],
})
export class SettingProductComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/product', title: 'Product Setting ' },
    ];
    public settings!: Observable<SettingPayload[]>;

    constructor(private service: ProductSettingUsecase) {}

    ngOnInit(): void {
        this.settings = this.service.getSettings();
    }

    public submitForm = (val: SettingPayload[]) => {};
}
