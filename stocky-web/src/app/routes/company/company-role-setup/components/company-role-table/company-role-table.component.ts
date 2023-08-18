import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of, shareReplay} from 'rxjs';
import {TableButtonEnum} from 'src/app/data/payload/common.enum';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {RolePayload} from '../../../_data/company.payload';
import {RoleUsecase} from '../../../_usecase/role.usecase';

@Component({
    selector: 'app-company-role-table',
    templateUrl: './company-role-table.component.html',
    styles: []
})
export class CompanyRoleTableComponent implements OnInit {

    @Output()
    public roleEmitter = new EventEmitter<RolePayload>();

    public list: Observable<RolePayload[]> = of([]);
    public tableCols: TableCol[] = [
        {title: 'Title'},
        {title: 'Description'},
        {title: 'Created Date'},
        {title: 'Permissions'},
        {title: 'Status'},
        {title: 'Action'}
    ];
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private usecase: RoleUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        this.usecase.trigger$.subscribe(value => this.loadData());
    }

    public onToggleRoleStatus = async (id: number) => {
        const response = await this.util.handleUsecaseRequest(this.usecase.toggleStatus(id), this.notification);
        if (response.ok) {
            this.usecase.setTrigger(true);
        }
    };

    public emptyAction = async (item: RolePayload) => {};

    public onToggleEdit = (item: RolePayload) => {
        if (item) {
            this.roleEmitter.emit(item);
        }
    };

    private loadData() {
        this.list = this.usecase.getAll().pipe(shareReplay());
    }

}
