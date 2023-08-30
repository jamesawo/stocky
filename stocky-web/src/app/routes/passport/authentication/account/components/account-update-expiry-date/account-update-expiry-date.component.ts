import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {AccountPayload} from '../../../_data/account.payload';
import {AccountUsecase} from '../../../_usecase/account.usecase';

@Component({
    selector: 'app-account-update-expiry-date',
    templateUrl: './account-update-expiry-date.component.html',
    styles: []
})
export class AccountUpdateExpiryDateComponent {
    @Output()
    public close = new EventEmitter<boolean>();

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;
    public expiryDate: string = '';

    constructor(
        private accountUsecase: AccountUsecase,
        private util: UtilService,
        private notification: NzNotificationService
    ) {}

    public handleUpdate = async () => {
        if (this.account?.expiryDate && this.account?.userId && this.expiryDate) {
            const request$ = this.accountUsecase.updateAccountExpiryDate(this.account.userId, this.expiryDate);
            await this.util.handleUsecaseRequest(request$, this.notification);
        }
    };

    public handleClose = () => {
        this.visibility = false;
        this.close.emit(true);
    };

    public emptyAction = () => {};
}
