import {Component, Input} from '@angular/core';
import {AccountPayload} from '../../../_data/account.payload';

@Component({
    selector: 'app-account-update-expiry-date',
    templateUrl: './account-update-expiry-date.component.html',
    styles: []
})
export class AccountUpdateExpiryDateComponent {
    @Input()
    public account?: AccountPayload;
    
    @Input()
    public visibility: boolean = false;

    public isLoading: boolean = false;

    public handleUpdate = () => {};

    public emptyAction = () => {};
}
