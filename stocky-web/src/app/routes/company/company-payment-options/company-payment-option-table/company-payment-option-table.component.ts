import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableButtonEnum} from '../../../../data/payload/common.enum';
import {CommonPayload} from '../../../../data/payload/common.payload';
import {TableEditCacheMap} from '../../../../data/payload/common.types';
import {TableCol} from '../../../../shared/components/table/table.component';
import {UtilService} from '../../../../shared/utils/util.service';
import {PaymentOptionUsecase} from '../../_usecase/payment-option.usecase';

@Component({
    selector: 'app-company-payment-option-table',
    templateUrl: './company-payment-option-table.component.html',
    styles: []
})
export class CompanyPaymentOptionTableComponent implements OnInit {

    public cols: TableCol[] = [
        {title: 'TITLE', width: 25},
        {title: 'DESCRIPTION', width: 35},
        {title: 'STATUS', width: 15},
        {title: '', width: 15}
    ];
    public data?: Observable<CommonPayload[]>;
    public editMap: TableEditCacheMap<any> = {};
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private usecase: PaymentOptionUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        this.loadData();
        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public loadData() {
        this.data = this.usecase.getAll().pipe(shareReplay());
    }

    public onConfirmToggleStatus = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        await this.util.handleUsecaseRequest(this.usecase.toggleStatus(id), this.notification);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: CommonPayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await this.util.handleUsecaseRequest(this.usecase.save(data), this.notification);
        this.data = this.util.handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelDisable = async () => {};

    public onCancelEdit = async (item: CommonPayload) => {
        if (item) {
            this.editMap = await this.util.handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: CommonPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCacheValueChange = (change: any, item: CommonPayload, field: string) => {
        const data: any = this.editMap[item.id!].data;
        data[field] = change;
    };

    public canEditItem(item: any): boolean {
        return this.editMap[item.id] && this.editMap[item.id].edit;
    }

    private notifyChange = () => {
        this.usecase.setTrigger(true);
    };
}
