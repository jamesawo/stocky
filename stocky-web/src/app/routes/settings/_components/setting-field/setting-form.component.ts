import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {PopOverConstant} from '../../../../data/constant/message.constant';
import {SettingField} from '../../_data/setting.enum';
import {SettingPayload} from '../../_data/setting.payload';

@Component({
    selector: 'app-setting-form',
    templateUrl: './setting-form.component.html',
})
export class SettingFormComponent implements OnInit {
    public input = SettingField.INPUT;
    public select = SettingField.SELECT;
    public radio = SettingField.RADIO;
    public toggle = SettingField.TOGGLE;
    public date = SettingField.DATE;
    public textarea = SettingField.TEXTAREA;
    public popTitle = PopOverConstant.POP_TITLE;

    @Input()
    public settings$!: Observable<SettingPayload[]>;
    public settings: SettingPayload[] = [];
    @Output()
    public onSubmit: EventEmitter<SettingPayload[]> = new EventEmitter<SettingPayload[]>();

    public formGroup: FormGroup = new FormGroup({});

    ngOnInit(): void {
        const controls: any = {};
        this.settings$.subscribe({
            next: (res) => {
                res.forEach((setting) => {
                    controls[setting.settingKey!] = new FormControl(setting.settingValue);
                });
                this.formGroup = new FormGroup(controls);
                this.settings = res;
            },
        });
    }

    public submit() {
        this.onSubmit.emit(this.formGroup.value);
    }
}
