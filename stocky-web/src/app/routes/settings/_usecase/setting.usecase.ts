import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {firstValueFrom} from 'rxjs';
import {SettingModuleEnum} from '../../../data/payload/common.enum';
import {getFromLocal, storeInLocal} from '../../../shared/utils/util';
import {SettingPayload} from '../_data/setting.payload';

@Injectable({providedIn: 'root'})
export class SettingUsecase {
    private url = environment.api.baseUrl + '/setting';

    constructor(private http: HttpClient) {}

    public async getByKey(key: string, module: SettingModuleEnum): Promise<string> {
        const localValue = await this.getFromLocal(key);
        return localValue ? localValue : await this.getFromApi(key, module);
    }

    private async getFromApi(key: string, module: SettingModuleEnum) {
        const httpCall = this.http.get<SettingPayload>(`${this.url}/find?key=${key}&module=${module}`);
        const result = await firstValueFrom(httpCall);

        const value = result.settingValue ?? '';
        storeInLocal(key, value);
        return value;
    }

    private getFromLocal(key: string) {
        return Promise.resolve(getFromLocal(key));
    }
}
