import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {SettingsService} from '@delon/theme';
import {environment} from '@env/environment';
import {AppDetail, LoginResponse, LoginUser} from '../_data/passport.payload';

export enum LocalStorageKey {
    USER = 'pu_user'
}

@Injectable({
    providedIn: 'root'
})
export class PassportUsecase {
    private url: string = environment.api.baseUrl + '/auth';

    constructor(
        private http: HttpClient,
        private settings: SettingsService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
    ) {}

    public login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${this.url}/login`, {
            username: username,
            password: password
        }, {observe: 'response'});
    }

    public storeLoginResponse(res?: LoginResponse): void {
        if (res) {
            const user = JSON.stringify(res);
            localStorage.setItem(LocalStorageKey.USER, user);
        }
    }

    public getAppDetail(): AppDetail | undefined {
        let item = localStorage.getItem(LocalStorageKey.USER);
        if (item) {
            const res = JSON.parse(item);
            return res.app;
        }
        return undefined;
    }

    public getLoginResponse(): LoginResponse | undefined {
        let item = localStorage.getItem(LocalStorageKey.USER);
        if (item) {
            return JSON.parse(item);
        }
        return undefined;
    }

    public getLoggedInUser(): LoginUser | undefined {
        let item = localStorage.getItem(LocalStorageKey.USER);
        if (item) {
            const res = JSON.parse(item);
            return res.user;
        }
        return undefined;
    }

    public getLoggedInUsername(): string | undefined {
        const loginResponse = this.getLoginResponse();
        return loginResponse?.user?.username;
    }

    public removeLoginResponse(): void {
        localStorage.removeItem(LocalStorageKey.USER);
    }

    public logout(): void {
        this.removeLoginResponse();
        this.tokenService.clear();
        this.router.navigateByUrl(this.tokenService.login_url!).then();
    }

}
