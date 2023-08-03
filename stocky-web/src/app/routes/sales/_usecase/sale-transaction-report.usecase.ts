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
export class SaleTransactionReportUsecase {

    private url = environment.api.baseUrl + '/sales/transaction';
    private drawerRef?: NzDrawerRef<any>;

    constructor(
        private drawerService: NzDrawerService,
        private http: HttpClient
    ) {}

    public handleDownloadAction(receiptDataUrl?: ArrayBuffer) {
        console.log('handle download', receiptDataUrl);
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

    public handlePrintAction(receiptDataUrl?: ArrayBuffer) {
        if (receiptDataUrl) {
            const fileURL = handleCreatePdfResourceUrl(receiptDataUrl);
            let openWindow: any = window.open(`${fileURL}`, '', 'height=480px, width=640px');
            openWindow.focus();
            openWindow.print();
        }
    };

    public handleCloseAction(args?: any) {
        console.log(this.drawerRef);
        this.drawerRef?.close(args);
    }

    public handlePreviewReceipt(receiptUrl: string): NzDrawerRef<SalesTransactionReceiptViewerComponent> {
        this.drawerRef = this.drawerService
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
                    downloadAction: this.handleDownloadAction,
                    printAction: this.handlePrintAction,
                    closeAction: this.handleCloseAction,
                    showControls: true
                }
            });

        return this.drawerRef;
    }

    public getReceiptData(reference: string, serial: string) {
        return this.http.get<ArrayBuffer>(`${this.url}/pdf-receipt?ref=${reference}&serial=${serial}`);
    }

}
