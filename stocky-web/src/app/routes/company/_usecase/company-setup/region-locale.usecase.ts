import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {CompanyLocaleDetailsPayload} from '../../_data/company-setup.payload';

@Injectable({
    providedIn: 'root'
})
export class RegionLocaleUsecase {

    private url = environment.api.baseUrl + '/company/setup/region';

    constructor(private http: HttpClient) {}

    public save(payload: CompanyLocaleDetailsPayload) {
        return this.http.post<CompanyLocaleDetailsPayload>(`${this.url}/save`, payload, {observe: 'response'});
    }

    public get() {
        return this.http.get<CompanyLocaleDetailsPayload>(`${this.url}/get`, {observe: 'response'});
    }

}
