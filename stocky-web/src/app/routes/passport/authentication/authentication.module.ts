import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyModule} from '../../company/company.module';
import {AccountComponent} from './account/account.component';
import {AccountTableListComponent} from './account/components/account-table-list/account-table-list.component';
import {AccountUpdateExpiryDateComponent} from './account/components/account-update-expiry-date/account-update-expiry-date.component';
import {AccountUpdateIconComponent} from './account/components/account-update-icon/account-update-icon.component';
import {AccountUpdatePasswordComponent} from './account/components/account-update-password/account-update-password.component';
import {AccountUpdateRoleComponent} from './account/components/account-update-role/account-update-role.component';
import {AccountUpdateStatusComponent} from './account/components/account-update-status/account-update-status.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';

const COMPONENTS: Array<Type<void>> = [
    AccountComponent,
    AccountTableListComponent,
    AccountUpdateIconComponent,
    AccountUpdateExpiryDateComponent,
    AccountUpdateRoleComponent,
    AccountUpdatePasswordComponent,
    AccountUpdateStatusComponent

];

@NgModule({
    imports: [AuthenticationRoutingModule, SharedModule, CompanyModule],
    declarations: COMPONENTS,
    exports: [CompanyModule]
})
export class AuthenticationModule {
}
