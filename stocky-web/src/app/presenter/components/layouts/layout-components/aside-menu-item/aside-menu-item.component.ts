import { Component, Input } from '@angular/core';
import { Menu } from '@app/core/types/menu';

@Component({
    selector: 'app-aside-menu-item',
    templateUrl: './aside-menu-item.component.html',
    styles: [
        `
            .i-md {
                width: 16px;
                height: 16px;
            }
        `,
    ],
})
export class AsideMenuItemComponent {
    @Input()
    public menu?: Menu;
}
