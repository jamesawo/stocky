import {Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {PopOverConstant} from '../../../../data/constant/message.constant';
import {SettingField} from '../../_data/setting.enum';
import {SettingPayload} from '../../_data/setting.payload';

@Component({
    selector: 'app-setting-form',
    templateUrl: './setting-form.component.html'
})
export class SettingFormComponent {
    public popTitle = PopOverConstant.POP_TITLE;
    public readonly settingField = SettingField;

    @Input()
    public settings$?: Observable<SettingPayload[]>;


    constructor(
        private fb: FormBuilder
    ) {}


}
