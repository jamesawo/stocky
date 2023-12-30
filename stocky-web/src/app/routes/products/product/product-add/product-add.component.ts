import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {PRODUCT_ADD_CRUMBS} from '../../../../data/constant/crumb.constant';
import {Message, ProductPopover} from '../../../../data/constant/message.constant';
import {SettingConstant} from '../../../../data/constant/setting.constant';
import {SettingModuleEnum} from '../../../../data/payload/common.enum';
import {UtilService} from '../../../../shared/utils/util.service';
import {SettingUsecase} from '../../../settings/_usecase/setting.usecase';
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

    @Input()
    public product: ProductPayload | undefined;

    public startPoint = 0;
    public isLoading = false;

    public tabs?: { title: string; template: TemplateRef<any> }[];
    public crumbs = PRODUCT_ADD_CRUMBS;
    public popover = ProductPopover;
    public form!: FormGroup;
    public isStockEnabled: boolean = false;

    @ViewChild('basicTmpl', {static: true})
    public basicTmpl!: TemplateRef<any>;

    @ViewChild('priceTmpl', {static: true})
    public priceTmpl!: TemplateRef<any>;

    constructor(
        private fb: FormBuilder,
        private notification: NzNotificationService,
        private usecase: ProductUsecase,
        private settingUsecase: SettingUsecase,
        private util: UtilService
    ) {
    }

    public ngOnInit(): void {
        this.tabs = [
            {title: 'BASIC DETAILS', template: this.basicTmpl},
            {title: 'PRICE & TAX', template: this.priceTmpl}
        ];

        this.initForm();
        this.checkIsStockEnabled().then();
    }

    public onSaveProduct = async (): Promise<void> => {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form);
            this.notification.create(
                'warning', Message.VALIDATION_ERROR,
                Message.INVALID_FORM_FIELDS, {nzPlacement: 'top'}
            );
            return;
        }

        this.isLoading = true;
        const product = this.form.value as ProductPayload;
        const response = await this.util.handleUsecaseRequest(this.usecase.create(product), this.notification);
        this.resetForm(response);

    };

    public onCancelSaveProduct = () => {
    };

    private initForm() {
        const basic = this.product?.basic;
        const price = this.product?.price;
        this.form = this.fb.group({
            id: [this.product?.id ?? null],
            basic: this.fb.group({
                productCategory: [basic?.productCategory ?? null, [Validators.required]],
                unitOfMeasure: [basic?.unitOfMeasure ?? null, [Validators.required]],
                status: [basic?.status ?? null, []],
                isActive: [basic?.isActive ?? true, [Validators.required]],
                useQuantity: [basic?.useQuantity ?? true, [Validators.required]],
                isService: [basic?.isService ?? false, [Validators.required]],
                minAgeLimit: [basic?.minAgeLimit ?? 15],
                productName: [basic?.productName ?? null, [Validators.required]],
                brandName: [basic?.brandName ?? null, [Validators.required]],
                sku: [basic?.sku ?? null],
                barcode: [basic?.barcode ?? null],
                description: [basic?.description ?? null],
                lowStockPoint: [basic?.lowStockPoint ?? 20],
                taxes: [basic?.taxes ?? [], []]
            }),
            price: this.fb.group({
                markup: [price?.markup ?? null],
                costPrice: [price?.costPrice ?? null],
                sellingPrice: [price?.sellingPrice ?? null]
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

    private async checkIsStockEnabled() {
        this.isStockEnabled = await this.settingUsecase.getByKeyAsBool(
            SettingConstant.SETTING_STOCK_ENABLE_STOCK,
            SettingModuleEnum.STOCK,
            true);
    }
}
