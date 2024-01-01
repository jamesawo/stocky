import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {format, parse} from 'date-fns';
import {NzDateMode} from 'ng-zorro-antd/date-picker';
import {FormProps} from '../../../data/payload/common.types';
import {UtilService} from '../../utils/util.service';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styles: []
})
export class DatePickerComponent implements OnInit, OnChanges {
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

    @Input()
    public validateFn: (date: Date) => boolean = (current: Date) => false
    

    constructor(private util: UtilService) {
    }

    public get status() {
        if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            const {formGroup, controlName} = this.formProps;
            return this.util.getNzFormControlValidStatus(controlName, formGroup);
        }

        return this.hasError ? 'error' : 'success';
    }

    public ngOnInit(): void {
        if (this.select && this.select.length > 1) {
            this.setDefaultDate(this.select);
        } else if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            this.setDateFromTheFormGroup(this.formProps.controlName, this.formProps.formGroup);
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public setDefaultDate(value: string): void {
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

    private setDateFromTheFormGroup(controlName: string, formGroup: FormGroup) {
        let controlValue = formGroup.controls[controlName].value;
        this.setDefaultDate(controlValue);
    }

    private setFormControl(dateValue: string): void {
        if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            const {formGroup, controlName} = this.formProps;
            formGroup.get(controlName)?.setValue(dateValue);
            this.formProps = {formGroup, controlName};
        }
    }

}
