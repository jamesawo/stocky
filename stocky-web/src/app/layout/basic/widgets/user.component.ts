import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {MenuRoute} from '../../../data/constant/menu.payload';
import {PassportUsecase} from '../../../routes/passport/authentication/_usecase/passport.usecase';

@Component({
    selector: 'header-user',
    template: `
        <div
            nzTrigger="click"
            class="alain-default__nav-item d-flex align-items-center px-sm"
            nz-dropdown
            [nzDropdownMenu]="userMenu"
        >
            <span class="mr1">
                {{loggedInUser() | titlecase }}
            </span>
            <nz-avatar [nzSrc]="user.avatar ?? ''" nzSize="small" class="mr-sm"></nz-avatar>
        </div>

        <nz-dropdown-menu #userMenu="nzDropdownMenu">
            <div nz-menu class="width-sm">
                <div nz-menu-item nzDisabled>
                    <i nz-icon nzType="user" class="mr-sm"></i>
                    {{ 'Help Center' }}
                </div>
                <div nz-menu-item nzDisabled>
                    <i nz-icon nzType="setting" class="mr-sm"></i>
                    {{ 'Settings' | i18n }}
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item [routerLink]="route.SALE.Shift">
                    <i nz-icon nzType="credit-card" class="mr-sm"></i>
                    {{ 'Shit Report' | i18n }}
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item (click)="logout()">
                    <i nz-icon nzType="logout" class="mr-sm"></i>
                    {{ 'Logout' | i18n }}
                </div>
            </div>
        </nz-dropdown-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
    route = MenuRoute;

    constructor(
        private settings: SettingsService,
        private passportUsecase: PassportUsecase
    ) {
    }

    get user(): User {
        return this.settings.user;
    }

    logout(): void {
        this.passportUsecase.logout();
    }

    loggedInUser() {
        const user = this.passportUsecase.getLoggedInUser();
        const username = user?.username ?? '';

        if (username.length > 10) {
            return username.slice(0, 10);
        }
        return username;
    }
}
