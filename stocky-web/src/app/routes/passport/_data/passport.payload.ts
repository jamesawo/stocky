import {Menu} from '@delon/theme';

export class LoginResponse {
    menu?: Menu[];
    app?: AppDetail;
    user?: LoginUser;
}

export interface LoginUser {
    id?: number;
    username?: string;
    token?: string;
    fullName?: string;
    email?: string;
    enabled?: string;
    access?: string[];
}

export interface AppDetail {
    name: string;
    description: string;
    version: string;
}
