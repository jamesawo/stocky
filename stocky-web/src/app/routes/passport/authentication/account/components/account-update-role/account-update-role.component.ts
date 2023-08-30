import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {RolePayload} from '../../../../../company/_data/company.payload';
import {AccountPayload} from '../../../_data/account.payload';
import {AccountUsecase} from '../../../_usecase/account.usecase';

@Component({
    selector: 'app-account-update-role',
    templateUrl: './account-update-role.component.html',
    styles: []
})
export class AccountUpdateRoleComponent {
    @Output()
    public close = new EventEmitter<boolean>();

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;
    public roles: RolePayload[] = [];

    constructor(
        private accountUsecase: AccountUsecase,
        private util: UtilService,
        private notification: NzNotificationService
    ) {}

    public handleUpdate = async () => {
        if (this.account && this.account.userId && this.roles) {
            const user = this.account.userId;
            const roles = this.roles.map(role => new RolePayload(role.id));
            const response$ = this.accountUsecase.updateAccountRole(user, roles);
            await this.util.handleUsecaseRequest(response$, this.notification);
        }
    };

    public handleClose = () => {
        this.close.emit(true);
    };

    public emptyAction = () => {};
}
