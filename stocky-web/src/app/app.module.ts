import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { PresenterModule } from './presenter/presenter.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, PresenterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
