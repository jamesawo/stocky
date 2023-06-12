import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {CompanyAdministratorDetailsPayload} from '../../_data/company-setup.payload';

@Injectable({
    providedIn: 'root'
})
export class AdministratorProfileSetupUsecase {

    private url = environment.api.baseUrl + '/company/setup/administrator';

    constructor(private http: HttpClient) {}

    public save(payload: CompanyAdministratorDetailsPayload) {
        return this.http.post<CompanyAdministratorDetailsPayload>(`${this.url}/save`, payload, {observe: 'response'});
    }

    public get() {
        return this.http.get<CompanyAdministratorDetailsPayload>(`${this.url}/get`, {observe: 'response'});
    }

}
