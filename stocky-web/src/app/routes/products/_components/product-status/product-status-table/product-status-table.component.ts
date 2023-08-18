import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableEditCacheMap} from '../../../../../data/payload/common.types';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductStatusPayload} from '../../../_data/product.payload';
import {ProductStatusUsecase} from '../../../_usecase/product-status.usecase';

@Component({
    selector: 'app-product-status-table',
    templateUrl: './product-status-table.component.html',
    styles: []
})
export class ProductStatusTableComponent implements OnInit {

    public editMap: TableEditCacheMap<ProductStatusPayload> = {};
    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'DESCRIPTION', width: 40},
        {title: '', width: 20}
    ];

    public data?: Observable<ProductStatusPayload[]>;
    public isSaving = false;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: ProductStatusUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}


    public ngOnInit(): void {

        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public loadData() {
        this.data = this.usecase.getMany().pipe(shareReplay());
    }

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        const response = await this.util.handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.data = this.util.handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: ProductStatusPayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await this.util.handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.data = this.util.handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelDelete = async () => {};

    public onCancelEdit = async (item: ProductStatusPayload) => {
        if (item) {
            this.editMap = await this.util.handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: ProductStatusPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCacheValueChange = (change: any, item: ProductStatusPayload, field: string) => {
        const data: any = this.editMap[item.id!].data;
        data[field] = change;
    };

    public canEditItem(item: any) {
        return this.editMap[item.id] && this.editMap[item.id].edit;
    }

    private notifyChange = () => {
        this.usecase.triggerChange(true);
    };

}
