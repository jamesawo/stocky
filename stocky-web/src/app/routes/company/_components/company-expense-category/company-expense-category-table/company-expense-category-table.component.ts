import {Component, Input} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {TextTruncateProps} from '../../../../../shared/components/table-item-editable/table-item-editable.component';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {EditCacheMap} from '../../../../../shared/components/update-delete-action/update-delete-action.component';
import {
    handleCancelEditingTableItem,
    handleRemoveFromObservableListIfStatus,
    handleUpdateObservableListIfResponse,
    handleUsecaseRequest
} from '../../../../../shared/utils/util';
import {ExpenseCategoryUsecase} from '../../../_usecase/company-expenses/expense-category.usecase';

@Component({
    selector: 'app-company-expense-category-table',
    templateUrl: './company-expense-category-table.component.html',
    styles: []
})
export class CompanyExpenseCategoryTableComponent {
    @Input() public class?: string;

    public truncateProps: TextTruncateProps = {
        truncateAfter: 10,
        canTruncateText: true
    };

    public cols: TableCol[] = [
        {title: 'TITLE', width: 30},
        {title: 'DESCRIPTION', width: 40},
        {title: '', width: 20}
    ];
    public editMap: EditCacheMap<any> = {};
    public data?: Observable<CommonPayload[]>;

    constructor(
        private usecase: ExpenseCategoryUsecase,
        private notification: NzNotificationService
    ) {}

    public ngOnInit() {
        this.loadData();
        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public loadData() {
        this.data = this.usecase.getAll().pipe(shareReplay());
    }

    public onConfirmDelete = async (id: number) => {
        this.editMap[id] = {edit: false, data: {}, updating: false, deleting: true};
        const response = await handleUsecaseRequest(this.usecase.remove(id), this.notification);
        this.data = handleRemoveFromObservableListIfStatus(this.data!, {key: 'id', value: id}, response);
        this.editMap[id].deleting = false;
        this.notifyChange();
    };

    public onSaveEdit = async (category: CommonPayload) => {
        this.editMap[category.id!].updating = true;
        const data = this.editMap[category.id!].data;
        const response = await handleUsecaseRequest(this.usecase.save(data), this.notification);
        this.data = handleUpdateObservableListIfResponse(this.data!, response);
        this.editMap[category.id!].edit = false;
        this.notifyChange();
    };

    public onCancelDelete = async () => {};

    public onCancelEdit = async (item: CommonPayload) => {
        if (item) {
            this.editMap = await handleCancelEditingTableItem(item as any, this.data!, this.editMap);
        }
    };

    public onToggleEdit = (item: CommonPayload) => {
        if (item) this.editMap[item.id!] = {edit: true, data: {...item}, updating: false, deleting: false};
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
