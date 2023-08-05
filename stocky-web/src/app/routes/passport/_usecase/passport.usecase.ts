import {Injectable} from '@angular/core';
import {_HttpClient, MenuService} from '@delon/theme';
import {environment} from '@env/environment';
import {LoginResponse} from '../_data/passport.payload';

export enum LocalStorageKey {
    USER = 'pu_user'
}

@Injectable({
    providedIn: 'root'
})
export class PassportUsecase {
    private url: string = environment.api.baseUrl;

    constructor(private http: _HttpClient, private menuService: MenuService) {}

    public login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${this.url}/auth/login`, {
            username: username,
            password: password
        });
    }

    public storeLoginResponse(res: LoginResponse): void {
        const user = JSON.stringify(res);
        localStorage.setItem(LocalStorageKey.USER, user);
    }

    public getLoginResponse(): LoginResponse | undefined {
        let item = localStorage.getItem(LocalStorageKey.USER);
        if (item) {
            return JSON.parse(item);
        }
        return undefined;
    }

    public getLoggedInUsername(): string | undefined {
        const loginResponse = this.getLoginResponse();
        return loginResponse?.username;
    }

    public removeLoginResponse(): void {
        localStorage.removeItem(LocalStorageKey.USER);
    }

    public setMenu(res: LoginResponse): void {
        /*
        if (res.type === UserTypeEnum.ADMIN_USER) {
            // this.menuService.add(allMenu);
        } else if (res.type === UserTypeEnum.AGENT_USER) {
            // this.menuService.add(agentMenu);
        } else if (res.type.includes('SUPER')) {
            // this.menuService.add(allMenu);
        } else {
            this.menuService.add([]);
        }
         */
    }

    public setUser(loginResponse: LoginResponse) {
        const user: any = {
            name: loginResponse.fullName,
            avatar: loginResponse.profilePicUrl ?? './assets/tmp/img/avatar.jpg',
            username: loginResponse.username,
            token: loginResponse.token
        };
        return user;
    }

    public getAppDetails(): {name: string, description: string} {
        return {
            name: `Paymed v1`,
            description: `Cash Collection Service`
        };
    }
}
