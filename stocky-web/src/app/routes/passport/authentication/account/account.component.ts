import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {finalize, Observable, of, shareReplay} from 'rxjs';
import {ACCOUNT_CRUMB} from '../../../../data/constant/crumb.constant';
import {PageResultPayload, PageSearchPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {PageAlertComponent} from '../../../../shared/components/page-alert/page-alert.component';
import {UtilService} from '../../../../shared/utils/util.service';
import {EmployeeSearchPayload, RolePayload} from '../../../company/_data/company.payload';
import {RoleUsecase} from '../../../company/_usecase/role.usecase';
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

    @Output()
    public resultChange: EventEmitter<PageResultPayload<AccountPayload> | null> = new EventEmitter();

    public crumbs = ACCOUNT_CRUMB;
    public isFetchingRoles = false;
    public roles$?: Observable<RolePayload[]>;
    public searchPayload = new EmployeeSearchPayload();

    public pageRequest = new PagePayload();
    public tableData: Observable<AccountPayload[]> = of([]);
    public loadingData = false;

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
        this.loadingData = true;
        let result$ = this.accountUsecase.search(searchPayload).pipe(finalize(() => {this.loadingData = false;}));
        let result = await this.util.handleUsecaseRequest(result$, this.messageService);
        await this.handleSearchResult(result);
    };

    public handleReset = () => {
        this.clearTable();
        this.clearTable();
    };

    public async handlePageChange(page: PagePayload) {
        this.pageRequest = page;
        await this.handleSearch();
    }

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

    private async handleSearchResult(httpResponse: HttpResponse<PageResultPayload<AccountPayload>>) {
        if (httpResponse.ok) {
            this.resultChange.emit(httpResponse.body);
            if (httpResponse.body && httpResponse.body.result && httpResponse.body.page) {
                this.pageRequest = httpResponse.body.page;
                this.tableData = of(httpResponse.body.result);
            }

        }
    }

    private clearForm() {
        this.searchPayload = new EmployeeSearchPayload();
        this.pageRequest = new PagePayload();
    }

    private clearTable() {
        this.tableData = of([]);
    }
}
