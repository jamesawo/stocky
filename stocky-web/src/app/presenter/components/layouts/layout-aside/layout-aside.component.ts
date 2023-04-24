import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/core/types/menu';
import { Menus } from '@app/data/datasources/app-menu';

@Component({
    selector: 'app-layout-aside',
    templateUrl: './layout-aside.component.html',
})
export class LayoutAsideComponent {
    public menus: Menu[] = Menus;
}
