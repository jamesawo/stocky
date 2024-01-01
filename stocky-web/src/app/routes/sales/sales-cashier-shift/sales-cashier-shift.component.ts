import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {firstValueFrom, Subscription} from 'rxjs';
import {EmployeeUserAccountPayload} from '../../company/_data/company.payload';
import {PassportUsecase} from '../../passport/authentication/_usecase/passport.usecase';
import {
    SalesTransactionReceiptViewerComponent
} from '../_component/sales-transaction-receipt-viewer/sales-transaction-receipt-viewer.component';
import {SaleTransactionSearchRequest} from '../_data/sale-transaction.payload';
import {SaleTransactionReportUsecase} from '../_usecase/sale-transaction-report.usecase';

@Component({
    selector: 'app-sales-cashier-shift',
    templateUrl: './sales-cashier-shift.component.html',
    styles: []
})
export class SalesCashierShiftComponent implements OnInit, OnDestroy {
    @ViewChild('receiptViewerComponent', {static: true})
    public receiptViewerComponent?: SalesTransactionReceiptViewerComponent;

    public date?: string;
    public isLoading = false;
    public searchPayload: any = {};
    public isDateInvalid: boolean = false;
    public reportData?: ArrayBuffer;
    public searchBy: any;
    public username? = '';
    private sub = new Subscription();

    constructor(
        private passportService: PassportUsecase,
        private reportUsecase: SaleTransactionReportUsecase
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

    public async onSearch() {
        if (!this.date) {
            this.isDateInvalid = true;
            return;
        }
        this.isLoading = true;
        const searchRequest = new SaleTransactionSearchRequest();
        searchRequest.date = this.date;

        searchRequest.user = new EmployeeUserAccountPayload();
        this.username = this.passportService.getLoggedInUsername();
        searchRequest.user.username = this.passportService.getLoggedInUsername();

        const data = await firstValueFrom(this.reportUsecase.searchTransactionReport(searchRequest));
        this.displayReportData(data)
    }

    onSearchByChange(value: any) {
    }

    private displayReportData(data: ArrayBuffer) {
        this.reportData = data;
        this.isLoading = false;
    }
}
