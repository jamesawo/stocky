import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {handleCreatePdfResourceUrl, handleFileDownload} from '../../../../shared/utils/util';
import {ComponentReportPreviewType} from '../../_data/sale.interface';

@Component({
    selector: 'app-sales-transaction-receipt-viewer',
    templateUrl: './sales-transaction-receipt-viewer.component.html',
    styles: [

        `
          /*.pdf-viewer-box {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          */

          .pdf-container {
            width: 100%;
            height: 600px; /* Set an appropriate height for your use case */
            overflow: hidden;
          }

          iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }

          .iframe > iframe > #toolbar {
            display: none;
          }

        `
    ]
})
export class SalesTransactionReceiptViewerComponent implements ComponentReportPreviewType, OnInit, OnChanges {

    @Input()
    public data?: ArrayBuffer;

    @Input()
    public showControls = false;

    public isContentLoaded = false;
    public resourceUrl?: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}

    public downloadAction: (arg?: any) => void = () => {
        if (this.data) {
            const fileUrl = handleCreatePdfResourceUrl(this.data);
            handleFileDownload(fileUrl);
        }
    };

    public printAction: (arg?: any) => void = () => {
        if (this.data) {
            const fileURL = handleCreatePdfResourceUrl(this.data);
            let openWindow: any = window.open(`${fileURL}`, '', 'height=550px, width=550px');
            openWindow.focus();
            openWindow.print();
        }
    };


    public ngOnInit(): void {
        if (this.data) {
            this.onLoadReportBuffer(this.data as ArrayBuffer);
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }

    public onClear() {
        this.isContentLoaded = false;
        this.data = undefined;
        this.resourceUrl = undefined;
    }

    public onLoadReportBuffer(buffer: ArrayBuffer) {
        if (buffer) {
            const fileURL = `${handleCreatePdfResourceUrl(buffer)}#toolbar=0`;
            this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
            this.isContentLoaded = true;
        }
    }

}
