import {Component, Input} from '@angular/core';
import {AccountPayload} from '../../../_data/account.payload';

@Component({
    selector: 'app-account-update-password',
    templateUrl: './account-update-password.component.html',
    styles: []
})
export class AccountUpdatePasswordComponent {

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;

    public handleUpdate = () => {};

    public emptyAction = () => {};

}
