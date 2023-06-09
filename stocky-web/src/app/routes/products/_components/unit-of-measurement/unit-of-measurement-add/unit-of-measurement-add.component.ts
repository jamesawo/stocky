import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {ProductUnitOfMeasurePayload} from 'src/app/routes/products/_data/product-unit-of-measure.payload';
import {UnitOfMeasureUsecase} from 'src/app/routes/products/_usecase/unit-of-measure.usecase';
import {TableCol} from 'src/app/shared/components/table/table.component';
import {
    handleAppendToObservableListIfResponse,
    handleCancelEditingTableItem,
    handleRemoveFromObservableListIfStatus,
    handleUpdateObservableListIfResponse,
    handleUsecaseRequest,
    isFormInvalid
} from 'src/app/shared/utils/util';
import {TableButtonEnum} from '../../../../../data/payload/common.enum';
import {TableEditCacheMap} from '../../../../../data/payload/common.types';

@Component({
    selector: 'app-unit-of-measurement-add',
    templateUrl: './unit-of-measurement-add.component.html',
    styles: []
})
export class UnitOfMeasurementAddComponent implements OnInit {
    public isSaving = false;
    public isVisible = false;
    public form!: UntypedFormGroup;
    public editMap: TableEditCacheMap<ProductUnitOfMeasurePayload> = {};
    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'UNIT', width: 30},
        {title: '', width: 20}
    ];

    public data?: Observable<any[]>;
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: UnitOfMeasureUsecase,
        private notification: NzNotificationService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            unit: [null, [Validators.required]]
        });

        this.data = this.usecase.getMany().pipe(shareReplay());
    }

    public async onCreate(): Promise<void> {
        const isInvalid = isFormInvalid(this.form);
        if (isInvalid) {
            this.notification.info('INVALID FIELDS', 'SOME FIELDS ARE INVALID, CHECK AND RETRY.');
            return;
        }
        this.isSaving = true;
        const formValue = this.form.value;
        let response = await handleUsecaseRequest(this.usecase.save(formValue), this.notification);
        this.data = handleAppendToObservableListIfResponse(this.data!, response);
        this.onAfterCreate(response);
    }

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        const response = await handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: ProductUnitOfMeasurePayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelDelete = async () => {};

    public onCancelEdit = async (item: ProductUnitOfMeasurePayload) => {
        if (item) {
            this.editMap = await handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: ProductUnitOfMeasurePayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCacheValueChange = (change: any, item: ProductUnitOfMeasurePayload, field: string) => {
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

    private notifyChange() {
        this.usecase.triggerChange(true);
    }
}
