import { Component, Input, OnInit } from '@angular/core';
import { SettingPayload } from '../../_data/setting.payload';
import { FormGroup } from '@angular/forms';
import { SettingField } from '../../_data/setting.enum';

@Component({
    selector: 'app-setting-field',
    templateUrl: './setting-field.component.html',
})
export class SettingFieldComponent implements OnInit {
    public select = SettingField.SELECT;
    public input = SettingField.INPUT;
    public radio = SettingField.RADIO;
    public toggle = SettingField.TOGGLE;
    public textarea = SettingField.TEXTAREA;

    @Input()
    public settings: SettingPayload[] = [];

    @Input()
    public form: FormGroup = new FormGroup<any>({});

    @Input()
    public onSubmitHandler: () => void = () => {};

    ngOnInit(): void {}
}
