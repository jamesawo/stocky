import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {
    ALAIN_I18N_TOKEN,
    MenuService,
    SettingsService,
    TitleService,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { I18NService } from '../i18n/i18n.service';
import { catchError, map, Observable, of, zip } from 'rxjs';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { MENU_BAG } from 'src/app/data/menu';

@Injectable()
export class StartupService {
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private router: Router
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    }

    load(): Observable<void> {
        // http
        // return this.viaHttp();
        // mock: Don’t use it in a production environment. ViaMock is just to simulate some data to make the scaffolding work normally
        return this.viaMockI18n();
    }

    private viaHttp(): Observable<void> {
        const defaultLang = this.i18n.defaultLang;
        return zip(
            this.i18n.loadLangData(defaultLang),
            this.httpClient.get('assets/tmp/app-data.json')
        ).pipe(
            catchError((res: NzSafeAny) => {
                console.warn(
                    `StartupService.load: Network request failed`,
                    res
                );
                setTimeout(() => this.router.navigateByUrl(`/exception/500`));
                return [];
            }),
            map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
                this.i18n.use(defaultLang, langData);
                this.settingService.setApp(appData.app);
                this.settingService.setUser(appData.user);
                this.aclService.setFull(true);
                this.menuService.add(appData.menu);
                this.titleService.suffix = appData.app.name;
            })
        );
    }

    private viaMockI18n(): Observable<void> {
        const defaultLang = this.i18n.defaultLang;
        return this.i18n.loadLangData(defaultLang).pipe(
            map((langData: NzSafeAny) => {
                this.i18n.use(defaultLang, langData);
                this.viaMock();
            })
        );
    }

    private viaMock(): Observable<void> {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //   this.router.navigateByUrl(this.tokenService.login_url!);
        //   return;
        // }

        // mock
        const app: any = {
            name: `ng-alain`,
            description: `Stocky, A store management software`,
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/tmp/img/avatar.jpg',
            email: 'cipchk@qq.com',
            token: '123456789',
        };
        this.settingService.setApp(app);
        this.settingService.setUser(user);
        this.aclService.setFull(true);
        this.menuService.add(MENU_BAG);
        this.titleService.suffix = app.name;
        return of(void 0);
    }
}
