import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingPayload } from '../../_data/setting.payload';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingField } from '../../_data/setting.enum';
import { Observable } from 'rxjs';

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

    @Input()
    public settings$!: Observable<SettingPayload[]>;
    public settings: SettingPayload[] = [];
    @Output()
    public onSubmit: EventEmitter<SettingPayload[]> = new EventEmitter<
        SettingPayload[]
    >();

    public formGroup: FormGroup = new FormGroup({});

    ngOnInit(): void {
        const controls: any = {};
        this.settings$.subscribe({
            next: (res) => {
                res.forEach((setting) => {
                    controls[setting.settingKey!] = new FormControl(
                        setting.settingValue
                    );
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
