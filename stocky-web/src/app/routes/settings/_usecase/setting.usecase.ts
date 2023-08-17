import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {firstValueFrom} from 'rxjs';
import {SettingModuleEnum} from '../../../data/payload/common.enum';
import {UtilService} from '../../../shared/utils/util.service';
import {SettingPayload} from '../_data/setting.payload';

@Injectable({providedIn: 'root'})
export class SettingUsecase {

    private url = environment.api.baseUrl + '/setting';

    constructor(private http: HttpClient, private util: UtilService) {}

    public updateValue(payload: SettingPayload) {
        return this.http.put<boolean>(`${this.url}/update`, payload);
    }

    public async getByKey(key: string, module: SettingModuleEnum, ignoreCache = false): Promise<string> {
        if (ignoreCache) {
            return await this.getFromApi(key, module);
        }
        return this.getFromLocalOrApi(key, module);
    }

    public async getByKeyAsBool(key: string, module: SettingModuleEnum, ignoreCache = false): Promise<boolean> {
        let value = await this.getByKey(key, module, ignoreCache);
        return this.util.stringToBoolean(value);
    }

    private async getFromLocalOrApi(key: string, module: SettingModuleEnum): Promise<string> {
        const localValue = await this.getFromLocal(key);
        return localValue ? localValue : await this.getFromApi(key, module);
    }

    private async getFromApi(key: string, module: SettingModuleEnum): Promise<string> {
        let value = '';
        const httpCall = this.http.get<SettingPayload>(`${this.url}/find?key=${key}&module=${module}`);
        const result = await firstValueFrom(httpCall);
        value = result.settingValue ?? '';

        this.util.storeInLocal(key, value);
        return value;
    }

    private getFromLocal(key: string) {
        return Promise.resolve(this.util.getFromLocal(key));
    }
}
