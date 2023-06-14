import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {format, parse} from 'date-fns';
import {FormProps} from '../../../data/payload/common.types';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styles: []
})
export class DatePickerComponent implements OnInit {
    public selectedDate: Date | undefined;
    public dateFormat: string = 'yyyy-MM-dd';

    @Input('default')
    public defaultSelected: string = '';

    @Input()
    public hasError = false;

    @Output('selected')
    public selected: EventEmitter<string> = new EventEmitter<string>();

    @Input() public formProps?: FormProps;

    constructor() {
    }

    public get status() {
        return this.hasError ? 'error' : 'success';
    }


    public ngOnInit(): void {
        if (this.defaultSelected.length > 1) {
            this.setDefaultDate(this.defaultSelected);
        }
    }

    public setDefaultDate(value: string): void {
        //const convert = new Date(value);
        this.selectedDate = parse(value, this.dateFormat, new Date());
    }

    public onChange(dateValue: Date): void {
        if (dateValue) {
            let format1 = format(dateValue, this.dateFormat);
            this.selected.emit(format1);
            this.setFormControl(format1);
        } else {
            this.selected.emit(undefined);
        }

    }

    private setFormControl(dateValue: string): void {
        if (this.formProps && this.formProps.formGroup && this.formProps.controlName) {
            const {formGroup, controlName} = this.formProps;
            formGroup.get(controlName)?.setValue(dateValue);

            this.formProps = {formGroup, controlName};
        }
    }


}
