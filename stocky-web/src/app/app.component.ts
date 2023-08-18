import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, NavigationError, RouteConfigLoadStart, Router} from '@angular/router';
import {TitleService, VERSION as VERSION_ALAIN} from '@delon/theme';
import {environment} from '@env/environment';
import {NzModalService} from 'ng-zorro-antd/modal';
import {VERSION as VERSION_ZORRO} from 'ng-zorro-antd/version';
import * as Rollbar from 'rollbar';
import {AmplitudeService} from './shared/utils/amplitude.service';

import {RollbarService} from './shared/utils/rollbar.service';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
    constructor(
        el: ElementRef,
        renderer: Renderer2,
        private router: Router,
        private titleSrv: TitleService,
        private modalSrv: NzModalService,
        @Inject(RollbarService) private rollbar: Rollbar,
        private amplitude: AmplitudeService
    ) {
        renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
        renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    }

    ngOnInit(): void {
        let configLoad = false;
        this.router.events.subscribe(ev => {
            if (ev instanceof RouteConfigLoadStart) {
                configLoad = true;
            }
            if (configLoad && ev instanceof NavigationError) {
                this.modalSrv.confirm({
                    nzTitle: `Reminder`,
                    nzContent: environment.production ? `A new version of the app may have been released, please click Refresh to take effect.` : `Unable to load route：${ev.url}`,
                    nzCancelDisabled: false,
                    nzOkText: 'Refresh',
                    nzCancelText: 'Neglect',
                    nzOnOk: () => location.reload()
                });
            }
            if (ev instanceof NavigationEnd) {
                this.titleSrv.setTitle();
                this.modalSrv.closeAll();
            }
        });
    }
}
