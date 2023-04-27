import { NgModule } from '@angular/core';

import { NavAppsDropdownComponent } from './nav-apps-dropdown/nav-apps-dropdown.component';
import { NavInputSearchComponent } from './nav-input-search/nav-input-search.component';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavMobileHamburgerButtonComponent } from './nav-mobile-hamburger-button/nav-mobile-hamburger-button.component';
import { NavMobileSearchButtonComponent } from './nav-mobile-search-button/nav-mobile-search-button.component';
import { NavNotificationDropdownComponent } from './nav-notification-dropdown/nav-notification-dropdown.component';
import { NavThemeToggleButtonComponent } from './nav-theme-toggle-button/nav-theme-toggle-button.component';
import { NavUserMenuButtonComponent } from './nav-user-menu-button/nav-user-menu-button.component';
import { NavAppItemComponent } from './nav-apps-dropdown/nav-app-item/nav-app-item.component';
import { AsideMenuItemComponent } from './aside-menu-item/aside-menu-item.component';
import { AsideMobileSearchInputComponent } from './aside-mobile-search-input/aside-mobile-search-input.component';
import { AsideMenuItemDropdownComponent } from './aside-menu-item-dropdown/aside-menu-item-dropdown.component';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        NavInputSearchComponent,
        NavLogoComponent,
        NavMobileHamburgerButtonComponent,
        NavMobileSearchButtonComponent,
        NavNotificationDropdownComponent,
        NavAppsDropdownComponent,
        NavThemeToggleButtonComponent,
        NavUserMenuButtonComponent,
        NavAppItemComponent,
        AsideMenuItemComponent,
        AsideMobileSearchInputComponent,
        AsideMenuItemDropdownComponent,
    ],
    exports: [
        NavInputSearchComponent,
        NavLogoComponent,
        NavMobileHamburgerButtonComponent,
        NavMobileSearchButtonComponent,
        NavNotificationDropdownComponent,
        NavAppsDropdownComponent,
        NavThemeToggleButtonComponent,
        NavUserMenuButtonComponent,
        NavAppItemComponent,
        AsideMenuItemComponent,
        AsideMobileSearchInputComponent,
        AsideMenuItemDropdownComponent,
    ],
    imports: [RouterModule, IconsModule, CommonModule, BrowserModule],
})
export class LayoutComponentModule {}
