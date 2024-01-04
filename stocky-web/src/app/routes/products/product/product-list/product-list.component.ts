import {HttpResponse} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {catchError, firstValueFrom, Observable, of} from 'rxjs';
import {PRODUCT_LIST_CRUMBS} from 'src/app/data/constant/crumb.constant';
import {PageSearchPayload, UploadComponentInput} from 'src/app/data/payload/common.interface';
import {PagePayload} from 'src/app/data/payload/common.payload';
import {
    ProductPayload,
    ProductSearchRequestPayload,
    ProductTaxPayload
} from 'src/app/routes/products/_data/product.payload';
import {ProductUsecase} from 'src/app/routes/products/_usecase/product.usecase';
import {FileConstant} from '../../../../data/constant/file.constant';
import {FileMimeType, FileTemplate, FileType, ModalOrDrawer} from '../../../../data/payload/common.enum';
import {TableCol} from '../../../../shared/components/table/table.component';
import {UploadFileComponent, UploadFnProps} from '../../../../shared/components/upload-file/upload-file.component';
import {UploadImportService} from '../../../../shared/utils/upload-import.service';
import {UtilService} from '../../../../shared/utils/util.service';
import {ProductAddComponent} from '../product-add/product-add.component';
import {ResponsiveService} from "../../../../shared/utils/responsive.service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    @ViewChild('productAddComponent')
    public productAddComponent?: ProductAddComponent;

    public tableData?: Observable<any>;
    public isOpenHeader = true;
    public isLoading = false;
    public isLoadingTable = false;
    public pageRequest = new PagePayload();
    public searchPayload = new ProductSearchRequestPayload();
    public showDrawer = false;
    public productToUpdate?: ProductPayload;
    public drawerRef?: NzDrawerRef<UploadFileComponent>;
    public size = 350;

    public crumbs = PRODUCT_LIST_CRUMBS;
    public tableCols: TableCol[] = [
        {title: ''},
        {title: 'Category'},
        {title: 'Product Name'},
        {title: 'Brand Name'},
        {title: 'Cost Price'},
        {title: 'Margin %'},
        {title: 'Selling Price'},
        {title: 'Discount %'},
        {title: 'SKU'},
        {title: 'Qty'},
        {title: 'Type'},
        {title: 'Taxes'},
        {title: 'Status'},
        {title: 'Date Created'}
    ];
    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private router: Router,
        private usecase: ProductUsecase,
        private notification: NzNotificationService,
        private uploadService: UploadImportService,
        private cdr: ChangeDetectorRef,
        private util: UtilService,
        private responsiveService: ResponsiveService
    ) {
    }

    public ngOnInit() {
        this.responsiveService.screenWidth$.subscribe(value => {
            this.size = this.responsiveService.calculateDrawerWidth(value)
        });
    }

    public onCancelHandler = () => {
    };

    public onToggleCreateProductDrawer = async (product?: ProductPayload): Promise<void> => {
        if (product && product.id) {
            this.productToUpdate = product;
        }
        this.showDrawer = !this.showDrawer;
    };

    public onSearchProducts = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<ProductSearchRequestPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const observable = this.usecase.searchProducts(searchPayload);
        const response = await this.util.handleUsecaseRequest(observable, this.notification);

        if (response.ok && response.body) {
            this.displayResponseBodyOnTable(response.body?.result!);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onResetSearchForm = (): void => {
        this.searchPayload = new ProductSearchRequestPayload();
        this.tableData = of([]);
    };

    public onPageSizeChange(value: number) {
        this.pageRequest.pageSize = value;
        this.onSearchProducts().then();
    }

    public onPageIndexChange(value: number): void {
        this.pageRequest.pageNumber = value;
        this.onSearchProducts().then();
    }

    public callComponentCreateHandler() {
        this.productAddComponent?.onSaveProduct();
    }

    public handleFormResponse(response: HttpResponse<ProductPayload>) {
        if (response.ok) {
            this.displayResponseBodyOnTable([response.body!]);
            this.showDrawer = !this.showDrawer;
            this.productToUpdate = undefined;
        }
    }

    public async onProductPriceChange(product: ProductPayload) {
        const list: ProductPayload[] = await firstValueFrom(this.tableData!);
        const index = list.findIndex((value) => value.id == product.id);
        if (index != -1) {
            list[index] = product;
            this.displayResponseBodyOnTable([...list]);
        }
    }

    public handleUpload = () => {
        const arg: UploadComponentInput = {
            maxFileSizeInMB: FileConstant.MAX_UPLOAD_FILE_SIZE_MB,
            allowedFileTypes: [FileType.EXCEL_V2],
            onUploadTemplate: this.handleUploadTemplate,
            type: 'drag',
            canUploadMultipleFiles: false,
            canDownloadTemplate: true,
            onDownloadTemplate: this.handleDownloadTemplate
        };
        this.drawerRef = this.uploadService.upload(arg, 'Upload Product File');
    };

    public handleUploadTemplate = async (arg: UploadFnProps) => {
        const {formData} = arg;
        this.triggerIsUploading(true);
        this.usecase.uploadDataFile(formData).subscribe({
            next: (res) => {
                if (res && res.ok && res.body) {
                    this.notification.info(
                        'Product File Uploaded',
                        FileConstant.UPLOAD_RESULT,
                        {nzDuration: 9000, nzPauseOnHover: true}
                    );
                    const resourceUrl = this.util.handleCreateFileResourceUrl(res.body, FileMimeType.OCT);
                    this.util.handleFileDownload(resourceUrl, 'ScrapFile.txt');
                    this.triggerIsUploading(false);
                }
            },
            error: (err) => {
                this.util.handleHttpRequestError(err, {service: this.notification});
                this.triggerIsUploading(false);
            }
        });
    };

    public handleDownloadTemplate = async () => {
        const templateFile = await firstValueFrom(
            this.usecase.downloadTemplate().pipe(
                catchError((err) => this.util.handleHttpRequestError(err, {service: this.notification}))
            ));
        this.util.handleDownloadTemplate(templateFile, FileType.EXCEL_V2, FileTemplate.PRODUCT_UPLOAD_TEMPLATE);
    };

    public handleExportData = (arg?: FileType) => {
        this.uploadService.download();
    };

    public concatProductTax(taxes: ProductTaxPayload[]) {
        if (taxes) {
            return '[' + taxes.map(tax => ` ${this.util.getTaxTitle(tax)}`).toString() + ' ]';
        }
        return '[ ]';
    }

    private displayResponseBodyOnTable(body: ProductPayload[]) {
        this.tableData = of(body);
    }

    private triggerIsUploading(val: boolean) {
        const component = this.drawerRef?.getContentComponent();
        if (component) {
            component.isUploading = val;
        }
    }

}
