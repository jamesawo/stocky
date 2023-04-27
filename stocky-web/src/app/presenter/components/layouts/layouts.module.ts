import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { LayoutAsideComponent } from './layout-aside/layout-aside.component';
import { LayoutBreadcrumbComponent } from './layout-breadcrumb/layout-breadcrumb';
import { LayoutComponentModule } from './layout-components/layout-components.module';
import { LayoutFooterBottomComponent } from './layout-footer-bottom/layout-footer-bottom.component';
import { LayoutFooterTopComponent } from './layout-footer-top/layout-footer-top.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutNavBarComponent } from './layout-navbar/layout-navbar.component';
import { IconsModule } from '../icons/icons.module';
import { LayoutBaseComponent } from './layout-base/layout-base.component';

@NgModule({
    declarations: [
        LayoutNavBarComponent,
        LayoutAsideComponent,
        LayoutMainComponent,
        LayoutFooterTopComponent,
        LayoutFooterBottomComponent,
        LayoutBreadcrumbComponent,
        LayoutBaseComponent,
    ],
    exports: [
        LayoutNavBarComponent,
        LayoutAsideComponent,
        LayoutMainComponent,
        LayoutFooterTopComponent,
        LayoutFooterBottomComponent,
        LayoutBreadcrumbComponent,
        LayoutBaseComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        RouterOutlet,
        IconsModule,
        LayoutComponentModule,
    ],
})
export class LayoutModule {}
