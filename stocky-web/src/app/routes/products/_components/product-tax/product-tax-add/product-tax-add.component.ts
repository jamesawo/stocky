import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableButtonEnum} from '../../../../../data/payload/common.enum';
import {CommonAddProps, TableEditCacheMap} from '../../../../../data/payload/common.types';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductTaxPayload} from '../../../_data/product.payload';
import {ProductTaxUsecase} from '../../../_usecase/product-tax.usecase';

@Component({
    selector: 'app-product-tax-add',
    templateUrl: './product-tax-add.component.html',
    styles: [`.mbt-2 {
      margin-top: 10px;
      margin-bottom: 10px
    }`]
})
export class ProductTaxAddComponent implements OnInit {
    @Input()
    public props: CommonAddProps = {
        showForm: true,
        showTable: true
    };

    public isVisible = false;
    public form!: UntypedFormGroup;
    public editMap: TableEditCacheMap<ProductTaxPayload> = {};
    public cols: TableCol[] = [
        {title: 'TITLE', width: 25},
        {title: 'PERCENT', width: 10},
        {title: 'DESCRIPTION', width: 30},
        {title: 'STATUS', width: 15},
        {title: '', width: 20}
    ];

    public data?: Observable<ProductTaxPayload[]>;
    public isSaving = false;
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: ProductTaxUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            percent: [null, [Validators.required]],
            description: [null]
        });

        this.usecase.trigger$.subscribe(value => this.onLoadData());
    }

    public onLoadData = async () => {
        this.data = this.usecase.getMany().pipe(shareReplay());
    };

    public onConfirmToggleStatus = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        await this.util.handleUsecaseRequest(this.usecase.toggleStatus(id), this.notification);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public async onCreate(): Promise<void> {
        const isInvalid = this.util.isFormInvalid(this.form);
        if (isInvalid) {
            this.notification.info('INVALID FIELDS', 'SOME FIELDS ARE INVALID, CHECK AND RETRY.');
            return;
        }
        this.isSaving = true;
        const formValue = this.form.value;
        let response = await this.util.handleUsecaseRequest(this.usecase.save(formValue), this.notification);
        this.data = this.util.handleAppendToObservableListIfResponse(this.data!, response);
        this.onAfterCreate(response);
    }

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        const response = await this.util.handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = this.util.handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: ProductTaxPayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await this.util.handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = this.util.handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelToggle = async () => {};

    public onCancelEdit = async (item: ProductTaxPayload) => {
        if (item) {
            this.editMap = await this.util.handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: ProductTaxPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCacheValueChange = (change: any, item: ProductTaxPayload, field: string) => {
        const data: any = this.editMap[item.id!].data;
        data[field] = change;
    };

    public canEditItem(item: any) {
        return this.editMap[item.id] && this.editMap[item.id].edit;
    }

    private onAfterCreate = (response: HttpResponse<any>) => {
        this.isSaving = false;
        if (response.ok) {
            this.form.reset();
            this.notifyChange();
        }
    };

    private notifyChange = () => {
        this.usecase.triggerChange(true);
    };
}
