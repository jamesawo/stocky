import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {finalize, Observable, shareReplay} from 'rxjs';
import {ACCOUNT_CRUMB} from '../../../data/constant/crumb.constant';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';
import {PagePayload} from '../../../data/payload/common.payload';
import {PageAlertComponent} from '../../../shared/components/page-alert/page-alert.component';
import {UtilService} from '../../../shared/utils/util.service';
import {EmployeeSearchPayload, RolePayload} from '../../company/_data/company.payload';
import {RoleUsecase} from '../../company/_usecase/role.usecase';
import {AccountPayload} from '../_data/account.payload';
import {AccountUsecase} from '../_usecase/account.usecase';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
    @ViewChild('pageAlertComponent')
    public pageAlert?: PageAlertComponent;

    @ViewChild('alertContent', {read: TemplateRef})
    public alertContent?: TemplateRef<any>;

    public crumbs = ACCOUNT_CRUMB;
    public isFetchingRoles = false;
    public roles$?: Observable<RolePayload[]>;
    public searchPayload = new EmployeeSearchPayload();
    public pageRequest = new PagePayload();

    constructor(
        private accountUsecase: AccountUsecase,
        private roleUsecase: RoleUsecase,
        private messageService: NzMessageService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        this.handleGetRoles();
    }

    public noAction = () => {};

    public handleSearch = async () => {
        if (!this.searchPayload.hasAtLeastOneAccountProps()) {
            this.showErrorNotification();
            return;
        }

        const searchPayload: PageSearchPayload<EmployeeSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };

        let result$ = this.accountUsecase.search(searchPayload);
        let result = await this.util.handleUsecaseRequest(result$, this.messageService);
        await this.handleSearchResult(result);
    };


    private showErrorNotification() {

        if (this.pageAlert) {
            this.pageAlert!.type = 'warning';
            this.pageAlert!.showNotification(this.alertContent);
        }

    }

    private handleGetRoles() {
        this.isFetchingRoles = true;
        this.roles$ = this.roleUsecase.getAll().pipe(finalize(() => {this.isFetchingRoles = false;}), shareReplay());
    }

    private async handleSearchResult(result: HttpResponse<PageResultPayload<AccountPayload>>) {

        if (result.ok) {

        }
    }
}
