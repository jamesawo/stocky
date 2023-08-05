import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd/drawer';
import {Observable} from 'rxjs';
import {ResponsiveService} from '../../../shared/utils/responsive.service';
import {SalesTransactionReceiptViewerComponent} from '../_component/sales-transaction-receipt-viewer/sales-transaction-receipt-viewer.component';
import {SaleTransactionSearchRequest} from '../_data/sale-transaction.payload';
import {ComponentReportPreviewType} from '../_data/sale.interface';

@Injectable({
    providedIn: 'root'
})
export class SaleTransactionReportUsecase {
    private url = environment.api.baseUrl + '/sales/transaction';

    constructor(
        private drawerService: NzDrawerService,
        private http: HttpClient,
        private responsiveService: ResponsiveService
    ) {}

    public handlePreviewReceipt(receiptUrl: ArrayBuffer): NzDrawerRef<SalesTransactionReceiptViewerComponent> {
        return this.drawerService
            .create<SalesTransactionReceiptViewerComponent,
                ComponentReportPreviewType, void>({
                nzTitle: 'Preview Receipt',
                nzFooter: ' ',
                nzExtra: ' ',
                nzClosable: true,
                nzMaskClosable: false,
                nzWidth: this.getDrawerSize(),
                nzContent: SalesTransactionReceiptViewerComponent,
                nzContentParams: {
                    data: receiptUrl,
                    showControls: true
                }
            });
    }

    public searchTransactionReceipt(serial: string): Observable<ArrayBuffer> {
        return this.http.get(`${this.url}/search-receipt?serial=${serial}`, {responseType: 'arraybuffer'});
    }

    public searchTransactionReport(searchRequest: SaleTransactionSearchRequest): Observable<ArrayBuffer> {
        return this.http.post(`${this.url}/search-report`, searchRequest, {responseType: 'arraybuffer'});
    }

    private getDrawerSize(): number {
        const value = this.responsiveService.screenWidth$.value;
        return value > 700 ? 720 : 350;
    }
}
