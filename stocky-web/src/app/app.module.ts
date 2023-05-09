import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

import { default as ngLang } from '@angular/common/locales/en';
import { DELON_LOCALE, en_US as delonLang } from '@delon/theme';
import { zhCN as dateLang } from 'date-fns/locale';
import {
    en_US as zorroLang,
    NZ_DATE_LOCALE,
    NZ_I18N,
} from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GlobalConfigModule } from './global-config.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { JsonSchemaModule, SharedModule } from '@shared';
import { STWidgetModule } from './shared/st-widget/st-widget.module';
import { registerLocaleData } from '@angular/common';
// import { I18NService, StartupService } from '@core';
import { StartupService } from '@core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
    CaretLeftOutline,
    SettingOutline,
    StepBackwardOutline,
} from '@ant-design/icons-angular/icons';

const LANG = {
    abbr: 'en',
    ng: ngLang,
    zorro: zorroLang,
    date: dateLang,
    delon: delonLang,
};

registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
    { provide: LOCALE_ID, useValue: LANG.abbr },
    { provide: NZ_I18N, useValue: LANG.zorro },
    { provide: NZ_DATE_LOCALE, useValue: LANG.date },
    { provide: DELON_LOCALE, useValue: LANG.delon },
];

// const I18NSERVICE_PROVIDES: any[] = [
//     { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
// ];
const FORM_MODULES = [JsonSchemaModule];

let INTERCEPTOR_PROVIDES: any[] = [
    // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];

const GLOBAL_THIRD_MODULES: Array<Type<void>> = [];

export function StartupServiceFactory(
    startupService: StartupService
): () => Observable<void> {
    return () => startupService.load();
}

const APPINIT_PROVIDES = [
    StartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: StartupServiceFactory,
        deps: [StartupService],
        multi: true,
    },
];

const icons: IconDefinition[] = [
    StepBackwardOutline,
    CaretLeftOutline,
    SettingOutline,
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        GlobalConfigModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        STWidgetModule,
        NzMessageModule,
        NzNotificationModule,
        NzIconModule.forChild(icons),
        ...FORM_MODULES,
        ...GLOBAL_THIRD_MODULES,
    ],
    providers: [
        ...LANG_PROVIDES,
        ...INTERCEPTOR_PROVIDES,
        // ...I18NSERVICE_PROVIDES,
        ...APPINIT_PROVIDES,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
