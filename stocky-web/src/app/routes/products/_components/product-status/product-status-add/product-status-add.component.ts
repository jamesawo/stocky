import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {EditCacheMap} from '../../../../../shared/components/update-delete-action/update-delete-action.component';
import {
    handleAppendToObservableListIfResponse,
    handleCancelEditingTableItem,
    handleRemoveFromObservableListIfStatus,
    handleUpdateObservableListIfResponse,
    handleUsecaseRequest,
    isValidateFormControls,
} from '../../../../../shared/utils/util';
import {ProductStatusPayload} from '../../../_data/product.payload';
import {ProductStatusUsecase} from '../../../_usecase/product-status.usecase';

@Component({
    selector: 'app-product-status-add',
    templateUrl: './product-status-add.component.html',
    styles: [],
})
export class ProductStatusAddComponent implements OnInit {
    public isVisible = false;
    public form!: UntypedFormGroup;
    public editMap: EditCacheMap<ProductStatusPayload> = {};
    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'DESCRIPTION', width: 40},
        {title: '', width: 20},
    ];

    public data?: Observable<ProductStatusPayload[]>;
    public isSaving = false;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: ProductStatusUsecase,
        private notification: NzNotificationService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            description: [null],
        });

        this.data = this.usecase.getMany().pipe(shareReplay());
    }

    public async onCreate(): Promise<void> {
        const isInvalid = isValidateFormControls(this.form);
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
        this.editMap[id] = {edit: false, data: {}, updating: false, deleting: true};
        const response = await handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].deleting = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: ProductStatusPayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelDelete = async () => {};

    public onCancelEdit = async (item: ProductStatusPayload) => {
        if (item) {
            this.editMap = await handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: ProductStatusPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, deleting: false};
    };

    public onCacheValueChange = (change: any, item: ProductStatusPayload, field: string) => {
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
