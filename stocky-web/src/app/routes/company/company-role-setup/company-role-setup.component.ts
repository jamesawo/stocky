import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of, shareReplay} from 'rxjs';
import {ModalOrDrawer, TableButtonEnum} from '../../../data/payload/common.enum';
import {TableCol} from '../../../shared/components/table/table.component';
import {handleUsecaseRequest, toggleModalOrDrawer} from '../../../shared/utils/util';
import {CompanyRoleFormComponent} from '../_components/company-role/company-role-form/company-role-form.component';
import {RolePayload} from '../_data/company.payload';
import {RoleUsecase} from '../_usecase/role.usecase';

@Component({
    selector: 'app-company-role-setup',
    templateUrl: './company-role-setup.component.html',
    styles: []
})
export class CompanyRoleSetupComponent implements OnInit {
    @ViewChild('roleFormComponent')
    public roleFormComponent?: CompanyRoleFormComponent;

    public showDrawer = false;

    public tableCols: TableCol[] = [
        {title: 'Title'},
        {title: 'Description'},
        {title: 'Created Date'},
        {title: 'Permissions'},
        {title: 'Status'},
        {title: 'Action'}
    ];

    public list: Observable<RolePayload[]> = of([]);
    public selectedEditPayload?: RolePayload;

    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(private usecase: RoleUsecase,
                private notification: NzNotificationService) {}

    public ngOnInit() {
        this.usecase.trigger$.subscribe(value => this.loadData());
    }
    
    public onToggleRoleStatus = async (id: number) => {
        const response = await handleUsecaseRequest(this.usecase.toggleStatus(id), this.notification);
        if (response.ok) this.usecase.setTrigger(true);

    };

    public onHandleEmit(response: HttpResponse<RolePayload>) {
        if (response.ok) {
            this.showDrawer = false;
        }
    }

    public emptyAction = async (item: RolePayload) => {};

    public onToggleEdit = (item: RolePayload) => {
        if (item) {
            this.selectedEditPayload = item;
            this.onToggleDrawerOrModal();
        }
    };

    public onSave = () => {
        this.roleFormComponent?.onSave();
    };

    public onToggleDrawerOrModal(type = ModalOrDrawer.DRAWER) {
        const {showDrawer} = toggleModalOrDrawer(type, this.showDrawer, false);
        this.showDrawer = showDrawer;
    }

    private loadData() {
        this.list = this.usecase.getAll().pipe(shareReplay());
    }

}
