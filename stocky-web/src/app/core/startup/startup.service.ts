import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ACLService} from '@delon/acl';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {MenuService, SettingsService, TitleService} from '@delon/theme';
import {NzIconService} from 'ng-zorro-antd/icon';
// import { I18NService } from '../i18n/i18n.service';
import {Observable, of} from 'rxjs';

import {ICONS} from '../../../style-icons';
import {ICONS_AUTO} from '../../../style-icons-auto';
import {PassportUsecase} from '../../routes/passport/authentication/_usecase/passport.usecase';

@Injectable()
export class StartupService {
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        // @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private router: Router,
        private passportUsecase: PassportUsecase
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    }

    load(): Observable<void> {
        return this.viaLocal();
    }

    private viaLocal(): Observable<void> {

        const tokenData = this.tokenService.get();
        if (!tokenData?.token) {
            this.router.navigateByUrl(this.tokenService.login_url!).then();
            return of(void 0);
        }

        const res = this.passportUsecase.getLoginResponse();
        if (res && res.app && res.user && res.menu) {

            this.settingService.setApp(res.app);
            this.settingService.setUser(res.user);
            this.aclService.setAbility(res.user?.access ?? []);
            this.menuService.add(res.menu);
            this.titleService.suffix = res.app.name;
        }
        return of(void 0);

    }

}
