import {HttpResponse} from '@angular/common/http';
import {ChangeDetectorRef, Component, Inject, OnDestroy, Optional} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StartupService} from '@core';
import {ReuseTabService} from '@delon/abc/reuse-tab';
import {DA_SERVICE_TOKEN, ITokenService, SocialService} from '@delon/auth';
import {_HttpClient, SettingsService} from '@delon/theme';
import {LoginResponse} from '../authentication/_data/passport.payload';
import {PassportUsecase} from '../authentication/_usecase/passport.usecase';

// changeDetection: ChangeDetectionStrategy.OnPush
@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService]
})
export class UserLoginComponent implements OnDestroy {
    form = this.fb.nonNullable.group({
        userName: [null, [Validators.required, Validators.required]],
        password: [null, [Validators.required, Validators.required]],
        remember: [true]
    });


    public error = '';
    public errorList?: string[];
    // type = 0;
    public loading = false;

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
        private cdr: ChangeDetectorRef,
        private usecase: PassportUsecase
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

        this.usecase.login(userName.value!, password.value!).subscribe({
            next: (res) => this.handleLoginSuccess(res),
            error: (err) => this.handleLoginFailed(err)
        });
    }

    ngOnDestroy(): void {}

    private handleLoginSuccess(res: HttpResponse<LoginResponse>): void {
        if (!res.ok || !res.body) {
            this.error = res.statusText;
            this.cdr.detectChanges();
            return;
        }

        this.reuseTabService.clear();
        this.usecase.storeLoginResponse(res.body);
        this.tokenService.set({token: res.body.user?.token});

        this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
                url = '/';
            }
            this.router.navigateByUrl(url).then();
        });
    }

    private handleLoginFailed(err: any): void {
        this.error = err.error.message ?? '';
        this.errorList = err.error.error ?? [];
        this.loading = false;
    }
}
