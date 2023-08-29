import {Component} from '@angular/core';

enum ModalType {
    UPDATE_EXPIRY,
    UPDATE_PASSWORD,
    UPDATE_ROLE,
    UPDATE_STATUS
}

@Component({
    selector: 'app-account-update-icon',
    templateUrl: './account-update-icon.component.html',
    styles: []
})
export class AccountUpdateIconComponent {

    public activeModal?: ModalType;
    protected readonly ModalType = ModalType;

    public toggleModalVisibility(type: ModalType) {
        this.activeModal = type;
    }
}
