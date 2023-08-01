import {Component, Input, OnInit} from '@angular/core';
import {CompanyDetail} from 'src/app/data/constant/company-detail.constant';
import {SettingModuleEnum} from 'src/app/data/payload/common.enum';
import {SettingUsecase} from '../../../routes/settings/_usecase/setting.usecase';

@Component({
    selector: 'app-amount-currency',
    templateUrl: './amount-currency.component.html',
    styles: []
})
export class AmountCurrencyComponent implements OnInit {

    @Input()
    public amount: number | undefined = 0;

    public currency: string = '';

    constructor(private setting: SettingUsecase) {
    }

    async ngOnInit() {
        this.currency = await this.setting.getByKey(
            CompanyDetail.COMPANY_LOCALE_CURRENCY, SettingModuleEnum.COMPANY
        );
    }

}
