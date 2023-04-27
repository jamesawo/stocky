import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layouts/layouts.module';

@NgModule({
    imports: [IconsModule, LayoutModule],
    exports: [IconsModule, LayoutModule],
})
export class ComponentModule {}
