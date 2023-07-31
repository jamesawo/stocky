import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd/drawer';
import {getDateString, handleCreatePdfResourceUrl} from '../../../shared/utils/util';
import {SalesTransactionReceiptViewerComponent} from '../_component/sales-transaction-receipt-viewer/sales-transaction-receipt-viewer.component';
import {ReceiptViewType} from '../_data/sale-types';

@Injectable({
    providedIn: 'root'
})
export class SaleTransactionReceiptUsecase {

    private url = environment.api.baseUrl + '/sales/transaction';
    private drawerRef?: NzDrawerRef<any>;

    constructor(
        private drawerService: NzDrawerService,
        private http: HttpClient
    ) {}

    public handleDownloadReceipt(receiptDataUrl?: ArrayBuffer) {
        if (receiptDataUrl) {
            const fileURL = handleCreatePdfResourceUrl(receiptDataUrl);
            let anchorElement = document.createElement('a');
            document.body.appendChild(anchorElement);
            anchorElement.setAttribute('style', 'display: none');
            anchorElement.href = fileURL;
            anchorElement.download = `PaymentReceipt-${getDateString()}.pdf`;
            anchorElement.click();
            window.URL.revokeObjectURL(fileURL);
            anchorElement.remove();
        }
    };

    public handlePrintReceipt(receiptDataUrl?: ArrayBuffer) {
        if (receiptDataUrl) {
            const fileURL = handleCreatePdfResourceUrl(receiptDataUrl);
            let openWindow: any = window.open(`${fileURL}`, '', 'height=480px, width=640px');
            openWindow.focus();
            openWindow.print();
        }
    };

    public onPreviewReceipt(receiptUrl: string): NzDrawerRef<SalesTransactionReceiptViewerComponent> {

        return this.drawerService
            .create<SalesTransactionReceiptViewerComponent,
                ReceiptViewType, any>({
                nzTitle: 'Preview Receipt',
                nzFooter: ' ',
                nzExtra: ' ',
                nzClosable: true,
                nzMaskClosable: false,
                nzWidth: 720,
                nzContent: SalesTransactionReceiptViewerComponent,
                nzContentParams: {
                    receiptUrl: receiptUrl,
                    downloadAction: this.handleDownloadReceipt,
                    printAction: this.handlePrintReceipt,
                    closeAction: this.handleClosePreviewer
                }
            });

    }

    public handleClosePreviewer(args?: any) {
        this.drawerRef?.close(args);
    }

    public getReceiptData(reference: string, serial: string) {
        return this.http.get<ArrayBuffer>(`${this.url}/pdf-receipt?ref=${reference}&serial=${serial}`);
    }

}
