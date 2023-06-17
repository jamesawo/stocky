import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {format, parse} from 'date-fns';
import {IDateRange} from 'src/app/data/payload/common.interface';
import {DateRangeParam} from '../../../data/param/common.param';

@Component({
    selector: 'app-range-date-picker',
    templateUrl: './range-date-picker.component.html',
    styles: []
})
export class RangeDatePickerComponent implements OnInit {

    public selectedDate: Date[] | undefined;
    public dateFormat: string = 'yyyy-MM-dd';

    @Input()
    public select: DateRangeParam = new DateRangeParam();

    @Output()
    public selectChange: EventEmitter<IDateRange> = new EventEmitter<IDateRange>();

    constructor() {
    }

    ngOnInit(): void {
        if (this.select) {
            const {startDate, endDate} = this.select;
            this.setDefaultDate([startDate, endDate]);
        }
    }

    public setDefaultDate(value: string[]): void {
        const startDate = parse(value[0], this.dateFormat, new Date());
        const endDate = parse(value[1], this.dateFormat, new Date());
        this.selectedDate?.push(...[startDate, endDate]);
    }

    public onChange(dateValue: Date[]): void {
        if (dateValue.length) {
            let date1 = format(dateValue[0], this.dateFormat);
            let date2 = format(dateValue[1], this.dateFormat);
            this.selectChange.emit({startDate: date1, endDate: date2});
        } else {
            this.selectChange.emit(undefined);
        }
    }

    public onClear() {
        this.selectedDate = [];
    }

}
