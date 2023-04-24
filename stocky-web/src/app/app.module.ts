import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { LayoutModule } from '@app/presenter/components/layouts/layouts.module';

import { IconsModule } from './presenter/components/icons/icons.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LayoutModule, IconsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
