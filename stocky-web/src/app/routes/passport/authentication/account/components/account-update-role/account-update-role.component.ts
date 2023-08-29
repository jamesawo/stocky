import {Component, Input} from '@angular/core';
import {AccountPayload} from '../../../_data/account.payload';

@Component({
    selector: 'app-account-update-role',
    templateUrl: './account-update-role.component.html',
    styles: []
})
export class AccountUpdateRoleComponent {

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;

    public handleUpdate = () => {};

    public emptyAction = () => {};

}
