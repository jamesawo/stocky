import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
    Camera,
    Heart,
    Github,
    AlertOctagon,
    ChevronDown,
    Eye,
    Video,
    Bell,
    BookOpen,
    Book,
    Award,
    Gift,
    Grid,
    Home,
    Settings,
    Trello,
    Truck,
    ShoppingCart,
    ShoppingBag,
} from 'angular-feather/icons';

const icons = {
    Camera,
    Heart,
    Github,
    AlertOctagon,
    ChevronDown,
    Eye,
    Video,
    Bell,
    BookOpen,
    Book,
    Award,
    Gift,
    Grid,
    Home,
    Settings,
    Trello,
    Truck,
    ShoppingCart,
    ShoppingBag,
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule],
})
export class IconsModule {}
