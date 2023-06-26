import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {format, parse} from 'date-fns';
import {NzDateMode} from 'ng-zorro-antd/date-picker';
import {FormProps} from '../../../data/payload/common.types';
import {getNzFormControlValidStatus} from '../../utils/util';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styles: []
})
export class DatePickerComponent implements OnInit {
    public selectedDate: Date | undefined;
    public dateFormat: string = 'yyyy-MM-dd';

    @Input()
    public mode: NzDateMode = 'date';

    @Input()
    public select: string = '';

    @Input()
    public hasError = false;

    @Output()
    public selectChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() public formProps?: FormProps;

    constructor() {
    }

    public get status() {
        if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            const {formGroup, controlName} = this.formProps;
            return getNzFormControlValidStatus(controlName, formGroup);
        }

        return this.hasError ? 'error' : 'success';
    }


    public ngOnInit(): void {

        if (this.select && this.select.length > 1) {
            this.setDefaultDate(this.select);
        }
    }

    public setDefaultDate(value: string): void {
        //const convert = new Date(value);
        this.selectedDate = parse(value, this.dateFormat, new Date());
        this.setFormControl(value);
    }

    public onChange(dateValue: Date): void {
        if (dateValue) {
            let format1 = format(dateValue, this.dateFormat);
            this.selectChange.emit(format1);
            this.setFormControl(format1);
        } else {
            this.selectChange.emit(undefined);
        }

    }

    public onClear() {
        this.selectedDate = undefined;
        this.select = '';
    }

    private setFormControl(dateValue: string): void {
        if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            const {formGroup, controlName} = this.formProps;
            formGroup.get(controlName)?.setValue(dateValue);
            this.formProps = {formGroup, controlName};
        }
    }


}
