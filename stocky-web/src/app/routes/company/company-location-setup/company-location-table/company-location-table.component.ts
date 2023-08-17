import {Component} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {TableButtonEnum} from '../../../../data/payload/common.enum';
import {TableEditCacheMap} from '../../../../data/payload/common.types';
import {TableCol} from '../../../../shared/components/table/table.component';
import {UtilService} from '../../../../shared/utils/util.service';
import {LocationPayload} from '../../_data/company.payload';
import {LocationUsecase} from '../../_usecase/location.usecase';

@Component({
    selector: 'app-company-location-table',
    templateUrl: './company-location-table.component.html',
    styles: []
})
export class CompanyLocationTableComponent {

    public cols: TableCol[] = [
        {title: 'TITLE'},
        {title: 'TYPE'},
        {title: 'DESCRIPTION'},
        {title: 'STATUS'},
        {title: '', width: 10}
    ];
    public data?: Observable<LocationPayload[]>;
    public editMap: TableEditCacheMap<any> = {};
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private usecase: LocationUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public loadData() {
        this.data = this.usecase.getAll().pipe(shareReplay());
    }

    public onConfirmToggleStatus = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, loading: true};
        const response = await this.util.handleUsecaseRequest(this.usecase.toggleStatus(id), this.notification);
        this.editMap[id].loading = false;
        this.notifyChange();
    };

    public onSaveEdit = async (item: LocationPayload) => {
        this.editMap[item.id!].updating = true;
        const data = this.editMap[item.id!].data;
        const response = await this.util.handleUsecaseRequest(this.usecase.save(data), this.notification);
        this.data = this.util.handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[item.id!].edit = false;
        this.notifyChange();
    };

    public onCancelAction = async () => {};

    public onCancelEdit = async (item: LocationPayload) => {
        if (item) {
            this.editMap = await this.util.handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: LocationPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, loading: false};
    };

    public onCacheValueChange = (change: any, item: LocationPayload, field: string) => {
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
