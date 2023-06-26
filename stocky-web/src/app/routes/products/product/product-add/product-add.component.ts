import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {PRODUCT_ADD_CRUMBS} from '../../../../data/constant/crumb.constant';
import {Message, PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched} from '../../../../shared/utils/util';
import {ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

    @Output()
    public response = new EventEmitter<HttpResponse<ProductPayload>>();

    @Input()
    public showPageHeader = false;

    public startPoint = 0;
    public isLoading = false;

    public tabs?: {title: string; template: TemplateRef<any>}[];
    public crumbs = PRODUCT_ADD_CRUMBS;
    public popover = PRODUCT_CREATE_POPOVER;
    public form!: FormGroup;

    @ViewChild('basicTmpl', {static: true})
    public basicTmpl!: TemplateRef<any>;

    @ViewChild('priceTmpl', {static: true})
    public priceTmpl!: TemplateRef<any>;

    constructor(
        private fb: FormBuilder,
        private notification: NzNotificationService,
        private usecase: ProductUsecase
    ) {}

    public ngOnInit(): void {
        this.tabs = [
            {title: 'BASIC DETAILS', template: this.basicTmpl},
            {title: 'PRICE & TAX', template: this.priceTmpl}
        ];

        this.initForm();
    }

    public onSaveProduct = async (): Promise<void> => {
        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            this.notification.create(
                'warning', Message.VALIDATION_ERROR,
                Message.INVALID_FORM_FIELDS, {nzPlacement: 'top'}
            );
            return;
        }

        this.isLoading = true;
        const product = this.form.value as ProductPayload;
        const response = await handleUsecaseRequest(this.usecase.create(product), this.notification);
        this.resetForm(response);

    };

    public onCancelSaveProduct = () => {
    };

    private initForm() {
        this.form = this.fb.group({
            id: [null],
            basic: this.fb.group({
                productCategory: [null, [Validators.required]],
                unitOfMeasure: [null, [Validators.required]],
                status: [null, [Validators.required]],
                isActive: [true, [Validators.required]],
                useQuantity: [true, [Validators.required]],
                isService: [false, [Validators.required]],
                minAgeLimit: [13],
                productName: [null, [Validators.required]],
                brandName: [null, [Validators.required]],
                sku: [null],
                barcode: [null],
                description: [null],
                lowStockPoint: [20],
                taxes: [[], null]
            }),
            price: this.fb.group({
                markup: [null],
                costPrice: [null],
                sellingPrice: [null]
            })
        });
    }

    private resetForm(response: HttpResponse<ProductPayload>): void {
        this.isLoading = false;
        if (response.ok) {
            this.form.reset();
            this.initForm();
        }
        this.response.emit(response);

    }
}
