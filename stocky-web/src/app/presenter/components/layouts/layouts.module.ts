import { NgModule } from '@angular/core';

import { LayoutAsideComponent } from './layout-aside/layout-aside.component';
import { LayoutBreadcrumbComponent } from './layout-breadcrumb/layout-breadcrumb';
import { LayoutFooterBottomComponent } from './layout-footer-bottom/layout-footer-bottom.component';
import { LayoutFooterTopComponent } from './layout-footer-top/layout-footer-top.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutNavBarComponent } from './layout-navbar/layout-navbar.component';

@NgModule({
    declarations: [
        LayoutNavBarComponent,
        LayoutAsideComponent,
        LayoutMainComponent,
        LayoutFooterTopComponent,
        LayoutFooterBottomComponent,
        LayoutBreadcrumbComponent,
    ],
    exports: [
        LayoutNavBarComponent,
        LayoutAsideComponent,
        LayoutMainComponent,
        LayoutFooterTopComponent,
        LayoutFooterBottomComponent,
        LayoutBreadcrumbComponent,
    ],
})
export class LayoutModule {}
