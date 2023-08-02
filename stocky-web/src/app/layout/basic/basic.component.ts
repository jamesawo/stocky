import {Component} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {LayoutDefaultOptions} from '@delon/theme/layout-default';
import {environment} from '@env/environment';

@Component({
    selector: 'layout-basic',
    templateUrl: 'basic.component.html'
})
export class LayoutBasicComponent {
    options: LayoutDefaultOptions = {
        logoExpanded: `./assets/images/logo-full.svg`,
        logoCollapsed: `./assets/images/logo-compact.svg`
    };
    searchToggleStatus = false;
    showSettingDrawer = !environment.production;

    constructor(private settings: SettingsService) {}

    get user(): User {
        return this.settings.user;
    }
}
