import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layouts/layouts.module';

@NgModule({
    imports: [IconsModule, LayoutModule],
    exports: [IconsModule, LayoutModule],
})
export class ComponentModule {}
