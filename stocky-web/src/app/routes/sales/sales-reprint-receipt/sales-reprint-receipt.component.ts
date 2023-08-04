import {Component} from '@angular/core';
import {SaleTransactionReportUsecase} from '../_usecase/sale-transaction-report.usecase';

@Component({
    selector: 'app-sales-reprint-receipt',
    templateUrl: './sales-reprint-receipt.component.html',
    styles: []
})
export class SalesReprintReceiptComponent {
    public isLoading = false;
    public receiptNumber = '';
    public isValidInput = true;

    constructor(private usecase: SaleTransactionReportUsecase) {}

    public onSearch() {


    }
}
