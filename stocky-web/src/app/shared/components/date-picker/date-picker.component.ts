import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format, parse } from 'date-fns';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styles: [],
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

    constructor() {
    }

    ngOnInit(): void {
        if (this.defaultSelected.length > 1) {
            this.setDefaultDate(this.defaultSelected);
        }
    }

    public setDefaultDate(value: string): void{
        //const convert = new Date(value);
        this.selectedDate = parse(value, this.dateFormat, new Date());
    }

    public onChange(dateValue: Date): void {
        if(dateValue) {
            let format1 = format(dateValue, this.dateFormat);
            this.selected.emit(format1);
        }else{
            this.selected.emit(undefined);
        }

    }
}
