import {Component} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {SaleTransactionReportUsecase} from '../_usecase/sale-transaction-report.usecase';

@Component({
    selector: 'app-sales-reprint-receipt',
    templateUrl: './sales-reprint-receipt.component.html',
    styles: []
})
export class SalesReprintReceiptComponent {
    public isLoading = false;
    public receiptSerial = '';
    public isValidInput = true;

    constructor(private usecase: SaleTransactionReportUsecase) {}

    public async onSearch() {
        if (!this.receiptSerial) {
            this.isValidInput = false;
            return;
        } else {
            this.isValidInput = true;
        }

        const res = await firstValueFrom(this.usecase.searchTransactionReceipt(this.receiptSerial));
        this.usecase.handlePreviewReceipt(res);
    }

}
