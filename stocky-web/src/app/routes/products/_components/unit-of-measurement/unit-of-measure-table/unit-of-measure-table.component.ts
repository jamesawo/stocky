import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableButtonEnum} from '../../../../../data/payload/common.enum';
import {TableEditCacheMap} from '../../../../../data/payload/common.types';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductUnitOfMeasurePayload} from '../../../_data/product-unit-of-measure.payload';
import {UnitOfMeasureUsecase} from '../../../_usecase/unit-of-measure.usecase';

@Component({
    selector: 'app-unit-of-measure-table',
    templateUrl: './unit-of-measure-table.component.html',
    styles: []
})
export class UnitOfMeasureTableComponent implements OnInit {

    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'UNIT', width: 30},
        {title: '', width: 20}
    ];
    public data?: Observable<any[]>;
    public editMap: TableEditCacheMap<ProductUnitOfMeasurePayload> = {};

    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: UnitOfMeasureUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit(): void {
        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public loadData() {
        this.data = this.usecase.getMany().pipe(shareReplay());
    }

    public onCacheValueChange = (change: any, item: ProductUnitOfMeasurePayload, field: string) => {
        const data: any = this.editMap[item.id!].data;
        data[field] = change;
    };

    public canEditItem(item: any) {
        return this.editMap[item.id] && this.editMap[item.id].edit;
    }

    public onSaveEdit = async (item: ProductUnitOfMeasurePayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await this.util.handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = this.util.handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelEdit = async (item: ProductUnitOfMeasurePayload) => {
        if (item) {
            this.editMap = await this.util.handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: ProductUnitOfMeasurePayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCancelDelete = async () => {};

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        const response = await this.util.handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = this.util.handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    private notifyChange() {
        this.usecase.triggerChange(true);
    }

}
