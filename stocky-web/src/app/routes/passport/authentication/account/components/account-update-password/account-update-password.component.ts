import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {AccountPayload} from '../../../_data/account.payload';
import {AccountUsecase} from '../../../_usecase/account.usecase';

@Component({
    selector: 'app-account-update-password',
    templateUrl: './account-update-password.component.html',
    styles: []
})
export class AccountUpdatePasswordComponent {

    @Output()
    public close = new EventEmitter<boolean>();

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;
    public password = '';
    public confirmPassword = '';

    constructor(
        private accountUsecase: AccountUsecase,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private util: UtilService
    ) {}

    public handleUpdate = async () => {
        if (this.account && this.account.userId && this.isPasswordMatch()) {
            this.isLoading = true;
            const response$ = this.accountUsecase.updateAccountPassword(this.account.userId, this.password);
            await this.util.handleUsecaseRequest(response$, this.notification);
            this.isLoading = false;
        }
    };

    public handleClose = () => {
        this.close.emit(true);
    };

    public emptyAction = () => {};

    private isPasswordMatch(): boolean {
        const minChar: number = 3;

        if (this.password.length > minChar) {
            const isMatch = this.password == this.confirmPassword;
            if (!isMatch) {
                this.msg.error('Password and confirm password do not match');
            }
            return isMatch;
        } else {
            this.msg.error('Password must be greater than ' + minChar + ' characters');
        }

        return false;
    }

}
