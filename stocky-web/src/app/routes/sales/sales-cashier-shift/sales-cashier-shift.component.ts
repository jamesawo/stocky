import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserPayload} from '../../company/_data/company.payload';
import {PassportUsecase} from '../../passport/_usecase/passport.usecase';

@Component({
    selector: 'app-sales-cashier-shift',
    templateUrl: './sales-cashier-shift.component.html',
    styles: []
})
export class SalesCashierShiftComponent implements OnInit, OnDestroy {

    public searchBy: 'date' | 'cashier' = 'date';

    public date?: string;
    public isLoading = false;
    public searchPayload: any = {};
    public isDateInvalid: boolean = false;

    private sub = new Subscription();


    constructor(
        private passportService: PassportUsecase
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onDateSelected(date: string) {
        if (date) {
            this.date = date;
            this.isDateInvalid = false;
        } else {
            this.isDateInvalid = true;
        }
    }

    public onSearch() {
        if (!this.date) {
            this.isDateInvalid = true;
            return;
        }
        this.isLoading = true;
    }


    private getUser(): UserPayload {
        const loginRes = this.passportService.getLoginResponse();
        return new UserPayload(loginRes?.id);
    }
}
