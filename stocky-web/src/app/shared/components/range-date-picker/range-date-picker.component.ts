import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format, parse } from 'date-fns';
import { IDateRange } from '../../types/shared.interface';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styles: [
  ]
})
export class RangeDatePickerComponent implements OnInit {

    public selectedDate: Date[] | undefined;
    public dateFormat: string = 'yyyy-MM-dd';

    @Input('default') // did not use two way binding on purpose
    public defaultSelected: string[] = [];

    @Output('selected')
    public selected: EventEmitter<IDateRange> = new EventEmitter<IDateRange>();

    constructor() {
    }

    ngOnInit(): void {
        if (this.defaultSelected.length > 1) {
            this.setDefaultDate(this.defaultSelected);
        }
    }

    public setDefaultDate(value: string[]): void{
         const startDate = parse(value[0], this.dateFormat, new Date());
         const endDate = parse(value[1], this.dateFormat, new Date());
         this.selectedDate?.push(...[startDate, endDate])
    }

    public onChange(dateValue: Date[]): void {
        if (dateValue.length) {
            let date1 = format(dateValue[0], this.dateFormat);
            let date2 = format(dateValue[1], this.dateFormat);
            this.selected.emit({ startDate: date1, endDate: date2 });
        }else{
            this.selected.emit(undefined);
        }
    }

    public onClear(){
        this.selectedDate = [];
    }

}
