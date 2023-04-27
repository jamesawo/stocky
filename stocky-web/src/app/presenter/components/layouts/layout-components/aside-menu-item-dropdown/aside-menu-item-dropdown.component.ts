import { Component, Input } from '@angular/core';
import { Menu } from '@app/core/types/menu';

@Component({
    selector: 'app-aside-menu-item-dropdown',
    templateUrl: './aside-menu-item-dropdown.component.html',
    styles: [
        `
            .i-md {
                width: 16px;
                height: 16px;
            }
        `,
    ],
})
export class AsideMenuItemDropdownComponent {
    @Input()
    public item?: { index: number; menu: Menu };

    public open = false;
}
