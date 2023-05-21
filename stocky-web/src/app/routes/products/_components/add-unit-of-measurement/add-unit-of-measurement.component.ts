import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableCol} from '../../../../shared/components/table/table.component';
import {EditCacheMap} from '../../../../shared/components/update-delete-action/update-delete-action.component';
import {
    handleAppendToObservableListIfResponse,
    handleCancelEditingTableItem,
    handleRemoveFromObservableListIfStatus,
    handleUpdateObservableListIfResponse,
    handleUsecaseRequest,
    isValidateFormControls,
} from '../../../../shared/utils/util';
import {UnitOfMeasurePayload} from '../../_data/unit-of-measure.payload';
import {UnitOfMeasureUsecase} from '../../_usecase/unit-of-measure-usecase';

@Component({
    selector: 'app-add-unit-of-measurement',
    templateUrl: './add-unit-of-measurement.component.html',
    styles: [],
})
export class AddUnitOfMeasurementComponent implements OnInit {
    public isVisible = false;
    public form!: UntypedFormGroup;
    public editMap: EditCacheMap<UnitOfMeasurePayload> = {};
    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'UNIT', width: 30},
        {title: '', width: 20},
    ];

    public data?: Observable<any[]>;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: UnitOfMeasureUsecase,
        private notification: NzNotificationService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            unit: [null, [Validators.required]],
        });

        this.data = this.usecase.getMany().pipe(shareReplay());
    }

    public async onCreate(): Promise<void> {
        const isInvalid = isValidateFormControls(this.form);
        if (isInvalid) {
            this.notification.info('INVALID FIELDS', 'SOME FIELDS ARE INVALID, CHECK AND RETRY.');
            return;
        }
        const formValue = this.form.value;
        let response = await handleUsecaseRequest(this.usecase.save(formValue), this.notification);
        this.data = handleAppendToObservableListIfResponse(this.data!, response);
    }

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, deleting: true};
        const response = await handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].deleting = false;
    };

    public onSaveEdit = async (item: UnitOfMeasurePayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
    };

    public onCancelDelete = async () => {};

    public onCancelEdit = async (item: UnitOfMeasurePayload) => {
        if (item) {
            this.editMap = await handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: UnitOfMeasurePayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, deleting: false};
    };

    public onCacheValueChange = (change: any, item: UnitOfMeasurePayload, field: string) => {
        const data: any = this.editMap[item.id!].data;
        data[field] = change;
    };

    public canEditItem(item: any) {
        return this.editMap[item.id] && this.editMap[item.id].edit;
    }
}
