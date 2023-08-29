import {Component, Input} from '@angular/core';
import {AccountPayload} from '../../../_data/account.payload';

@Component({
    selector: 'app-account-update-status',
    templateUrl: './account-update-status.component.html',
    styles: []
})
export class AccountUpdateStatusComponent {

    @Input()
    public account?: AccountPayload;

    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;

    public handleUpdate = () => {};

    public emptyAction = () => {};
}
