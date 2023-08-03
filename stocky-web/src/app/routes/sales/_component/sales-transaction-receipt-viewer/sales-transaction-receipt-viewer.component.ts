import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {handleCreatePdfResourceUrl} from '../../../../shared/utils/util';

@Component({
    selector: 'app-sales-transaction-receipt-viewer',
    templateUrl: './sales-transaction-receipt-viewer.component.html',
    styles: [

        `
          .pdf-viewer-box {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .iframe > iframe > #toolbar {
            display: none;
          }

        `
    ]
})
export class SalesTransactionReceiptViewerComponent implements OnInit {

    @ViewChild('divElement')
    public divElement?: ElementRef<HTMLDivElement>;

    @Input()
    public data?: ArrayBuffer;

    @Input()
    public receiptUrl?: string;

    public dataUrl?: SafeResourceUrl;

    public isContentLoaded = false;

    constructor(private sanitizer: DomSanitizer) {}

    @Input()
    public downloadAction: (arg?: any) => void = () => {};

    @Input()
    public printAction: (arg?: any) => void = () => {};

    @Input()
    public closeAction: (arg?: any) => void = () => {};

    ngOnInit(): void {
        this.onLoadDataUrl();
    }

    public onClear() {
        this.isContentLoaded = false;
        this.data = undefined;
        this.dataUrl = '';
    }

    public onLoadSafeUrl() {
        if (this.data) {
            const fileURL = `${handleCreatePdfResourceUrl(this.data)}#toolbar=0`;
            this.dataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
            this.isContentLoaded = true;
        }
    }

    public onLoadDataUrl() {
        if (this.receiptUrl) {
            this.dataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.receiptUrl);
            this.isContentLoaded = true;
        }
    }

}
