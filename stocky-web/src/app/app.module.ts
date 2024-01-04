import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {default as ngLang} from '@angular/common/locales/en';
import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconDefinition} from '@ant-design/icons-angular';
import {CaretLeftOutline, SettingOutline, StepBackwardOutline} from '@ant-design/icons-angular/icons';
import {StartupService} from '@core';
import {DelonACLModule} from '@delon/acl';
import {JWTInterceptor} from '@delon/auth';
import {DELON_LOCALE, en_US as delonLang} from '@delon/theme';

import {JsonSchemaModule, SharedModule} from '@shared';
import {enUS, zhCN as dateLang} from 'date-fns/locale';
import {en_US, en_US as zorroLang, NZ_DATE_LOCALE, NZ_I18N} from 'ng-zorro-antd/i18n';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {Observable} from 'rxjs';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {GlobalConfigModule} from './global-config.module';
import {LayoutModule} from './layout/layout.module';
import {RoutesModule} from './routes/routes.module';
import {HttpErrorInterceptor} from './shared/interceptors/error-interceptor.service';
import {STWidgetModule} from './shared/st-widget/st-widget.module';
import {AmplitudeService} from './shared/utils/amplitude.service';
import {RollbarErrorHandler} from './shared/utils/rollbar-error-handler.service';
import {rollbarFactory, RollbarService} from './shared/utils/rollbar.service';

const LANG = {
    abbr: 'en',
    ng: ngLang,
    zorro: zorroLang,
    date: dateLang,
    delon: delonLang
};

registerLocaleData(LANG.ng, LANG.abbr);

const LANG_PROVIDES = [
    {provide: LOCALE_ID, useValue: LANG.abbr},
    {provide: NZ_I18N, useValue: LANG.zorro},
    {provide: NZ_DATE_LOCALE, useValue: LANG.date},
    {provide: DELON_LOCALE, useValue: LANG.delon},
    {provide: NZ_I18N, useValue: en_US},
    {provide: NZ_DATE_LOCALE, useValue: enUS}
];

const FORM_MODULES = [JsonSchemaModule];

let INTERCEPTOR_PROVIDES: any[] = [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    {provide: ErrorHandler, useClass: RollbarErrorHandler},
    {provide: RollbarService, useFactory: rollbarFactory},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
];

export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
    return () => startupService.load();
}

const APP_INIT_PROVIDES = [
    StartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: StartupServiceFactory,
        deps: [StartupService],
        multi: true
    },
    AmplitudeService
];

const icons: IconDefinition[] = [
    StepBackwardOutline,
    CaretLeftOutline,
    SettingOutline
];

@NgModule({
    declarations: [
        AppComponent
    ],
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
        DelonACLModule.forRoot(),
        ...FORM_MODULES,
    ],
    providers: [
        ...LANG_PROVIDES,
        ...INTERCEPTOR_PROVIDES,
        ...APP_INIT_PROVIDES
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
