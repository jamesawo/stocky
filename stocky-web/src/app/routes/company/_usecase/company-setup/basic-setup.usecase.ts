import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {CompanyBasicDetailsPayload} from '../../_data/company-setup.payload';

@Injectable({
    providedIn: 'root'
})
export class BasicSetupUsecase {

    private url = environment.api.baseUrl + '/company/setup/basic';

    constructor(private http: HttpClient) {}

    public save(payload: CompanyBasicDetailsPayload) {
        return this.http.post<CompanyBasicDetailsPayload>(`${this.url}/save`, payload, {observe: 'response'});
    }

    public get() {
        return this.http.get<CompanyBasicDetailsPayload>(`${this.url}/get`, {observe: 'response'});
    }

}
