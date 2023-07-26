import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {PopOverConstant} from '../../../../data/constant/message.constant';
import {SettingField} from '../../_data/setting.enum';
import {SettingPayload} from '../../_data/setting.payload';

@Component({
    selector: 'app-setting-form',
    templateUrl: './setting-form.component.html'
})
export class SettingFormComponent implements OnInit, OnDestroy {
    public popTitle = PopOverConstant.POP_TITLE;
    public readonly settingField = SettingField;
    public settings: SettingPayload[] = [];
    public formArray: FormArray = this.fb.array([]);
    public emptyFormGroup = this.fb.group({});

    @Input()
    public settings$!: Observable<SettingPayload[]>;

    @Output()
    public onSubmit: EventEmitter<SettingPayload[]> = new EventEmitter<SettingPayload[]>();

    private sub = new Subscription();

    constructor(
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        const controls: any = {};

        const formArray = this.fb.array([]);


        this.sub.add(
            this.settings$.subscribe({
                next: (res) => {

                    res.forEach(value => {
                        const control = new FormControl();
                        control.setParent(formArray);
                        control.setValue(value);
                        formArray.push(control);
                    });
                    this.settings = res;
                    this.formArray = formArray;
                }
            })
        );
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public async submit() {
        this.onSubmit.emit(this.settings);
    }

    public onSwitchValueChange(value: boolean, setting: SettingPayload) {
        setting.settingValue = `${value}`;
        const settings = [...this.settings];
        const index = settings.findIndex(value => value.id === setting.id);
        settings[index] = setting;
        this.settings = [...settings];
    }

    public getSwitchValue(setting: SettingPayload) {
        return setting.settingValue === 'true';
    }
}
