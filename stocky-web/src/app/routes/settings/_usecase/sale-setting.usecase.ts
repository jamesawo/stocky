import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {SettingPayload} from '../_data/setting.payload';

@Injectable({providedIn: 'root'})
export class SaleSettingUsecase {
    private url = environment.api.baseUrl + '/setting-sale';

    constructor(private http: HttpClient) {}

    public getSettings() {
        return this.http.get<SettingPayload[]>(`${this.url}/all`);
    }

    public updateSettings(settings: SettingPayload[]) {
        return this.http.post<any>(`${this.url}/update-all`, settings, {observe: 'response'});
    }
}
