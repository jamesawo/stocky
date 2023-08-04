import {HttpContext} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StartupService} from '@core';
import {ReuseTabService} from '@delon/abc/reuse-tab';
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialService} from '@delon/auth';
import {_HttpClient, SettingsService} from '@delon/theme';

import {finalize} from 'rxjs';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy {
    form = this.fb.nonNullable.group({
        userName: ['admin', [Validators.required, Validators.required]],
        password: ['password', [Validators.required, Validators.required]],
        remember: [true]
    });

    // #region fields
    error = '';
    type = 0;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private startupSrv: StartupService,
        private http: _HttpClient,
        private cdr: ChangeDetectorRef
    ) {}

    submit(): void {
        this.error = '';
        const {userName, password} = this.form.controls;
        userName.markAsDirty();
        userName.updateValueAndValidity();
        password.markAsDirty();
        password.updateValueAndValidity();
        if (userName.invalid || password.invalid) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();
        this.http
            .post(
                '/login/account',
                {
                    type: this.type,
                    userName: this.form.value.userName,
                    password: this.form.value.password
                },
                null,
                {
                    context: new HttpContext().set(ALLOW_ANONYMOUS, true)
                }
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.cdr.detectChanges();
                })
            )
            .subscribe((res) => {
                console.log(res);

                if (res.msg !== 'ok') {
                    this.error = res.msg;
                    this.cdr.detectChanges();
                    return;
                }

                this.reuseTabService.clear();
                res.user.expired = +new Date() + 1000 * 60 * 5;
                this.tokenService.set(res.user);
                this.startupSrv.load().subscribe(() => {
                    let url = this.tokenService.referrer!.url || '/';
                    if (url.includes('/passport')) {
                        url = '/';
                    }
                    this.router.navigateByUrl(url).then();
                });
            });
    }

    ngOnDestroy(): void {}
}
